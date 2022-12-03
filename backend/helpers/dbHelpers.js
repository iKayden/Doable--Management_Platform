// It needs to be changed completely!

module.exports = (db) => {
  const getUsers = () => {
    const query = {
      text: 'SELECT * FROM users',
    };

    return db.query(query).then((result) => result.rows);
  };

  const getProjects = (userId) => {
    const query = {
      text: `SELECT projects.id, projects.name, projects.description, projects.start_date, projects.expected_end_date, projects.completion_time, 
      COUNT(tasks.id) AS total_tasks, (SELECT COUNT(tasks.status) FROM tasks WHERE tasks.status='COMPLETED' AND tasks.project_id=projects.id) AS completed_tasks 
      FROM projects 
      JOIN tasks ON projects.id=tasks.project_id 
      JOIN project_users ON project_users.project_id=projects.id 
      WHERE subscribed_user_id=$1 
      GROUP BY projects.id`,
      values: [userId],
    };

    const secondQuery = {
      text: `SELECT projects.id, projects.name, projects.description, projects.start_date, projects.expected_end_date, projects.completion_time
      FROM projects
      JOIN project_users ON project_users.project_id=projects.id
      WHERE subscribed_user_id=$1 AND
      projects.id NOT IN (
        SELECT projects.id
        FROM projects 
        JOIN tasks ON projects.id=tasks.project_id 
        JOIN project_users ON project_users.project_id=projects.id 
        WHERE subscribed_user_id=$1 
         );`,
      values: [userId],
    };

    return db.query(query).then((result) => {
      const firstResult = result.rows;
      return db.query(secondQuery).then((result) => {
        firstResult.push(...result.rows);
        return firstResult;
      });
    });
  };

  const createProject = (name, description, start_date, expected_end_date) => {
    // We can build query string depending on the availability of start_date
    const query = {
      text: `INSERT INTO projects (name, description, start_date, expected_end_date)
    VALUES ($1, $2, $3, $4) RETURNING *`,
      values: [name, description, start_date, expected_end_date],
    };
    return db.query(query).then((result) => ({
      ...result.rows[0],
      total_tasks: 0,
      completed_tasks: 0,
    }));
  };

  const editProject = (
    id,
    name,
    description,
    start_date,
    expected_end_date,
    completion_time
  ) => {
    const query = {
      text: `
      UPDATE projects
      SET name = $2, description = $3, start_date = $4, expected_end_date = $5, completion_time=$6
      WHERE id = $1
      RETURNING *`,
      values: [
        id,
        name,
        description,
        start_date,
        expected_end_date,
        completion_time,
      ],
    };
    return db.query(query);
  };

  const createTask = (
    name,
    description,
    assigned_user_id,
    deadline,
    project_id
  ) => {
    // We can build query string depending on the availability of start_date
    const query = {
      text: `INSERT INTO tasks (name, description, assigned_user_id, deadline, project_id)
    VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      values: [name, description, assigned_user_id, deadline, project_id],
    };

    return db.query(query).then((result) => result.rows[0]);
  };

  const deleteProject = (id) => {
    const query = {
      text: 'DELETE FROM projects WHERE id = $1',
      values: [id],
    };
    return db.query(query);
  };

  const deleteTask = (id) => {
    const query = {
      text: 'DELETE FROM tasks WHERE id = $1',
      values: [id],
    };
    return db.query(query);
  };

  const editTask = (
    id,
    name,
    description,
    status,
    deadline,
    completion_time,
    assigned_user_id,
    project_id
  ) => {
    const query = {
      text: `
      UPDATE tasks
      SET name = $2, description = $3,
      status = $4,
      deadline = $5,
      completion_time = $6,
      assigned_user_id = $7,
      project_id = $8
      WHERE id = $1
      RETURNING *`,
      values: [
        id,
        name,
        description,
        status,
        deadline,
        completion_time,
        assigned_user_id,
        project_id,
      ],
    };

    return db.query(query);
  };

  const getTasksByProjectId = (id) => {
    const query = {
      text: `
      SELECT projects.name AS project_name, projects.id AS project_id, tasks.id, tasks.name, tasks.description, tasks.status, tasks.deadline, tasks.completion_time, tasks.assigned_user_id, users.name AS user_name, users.avatar
      FROM projects
      JOIN tasks ON projects.id=tasks.project_id
      JOIN users ON tasks.assigned_user_id=users.id
      WHERE projects.id = $1
      `,
      values: [id],
    };
    return db.query(query);
  };

  const getUserByEmail = (email) => {
    const query = {
      text: `SELECT * FROM users WHERE email = $1`,
      values: [email],
    };

    return db.query(query).then((result) => result.rows[0]);
  };

  const getUsersByProjectId = (id) => {
    const query = {
      text: `SELECT users.id, users.name, users.email, users.avatar FROM users JOIN project_users ON subscribed_user_id=users.id WHERE project_id = $1`,
      values: [id],
    };

    return db.query(query).then((result) => result.rows);
  };

  const addUser = (name, avatar, email, password) => {
    const query = {
      text: `INSERT INTO users (name, avatar, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
      values: [name, avatar, email, password],
    };

    return db.query(query);
  };

  const addUsersToProject = (users, projectId) => {
    const usersValues = users
      .map((user) => {
        return `(${user.value}, ${projectId})`;
      })
      .join(',');
    //could change it to $1,$2...
    const query = `INSERT INTO project_users (subscribed_user_id, project_id) VALUES ${usersValues} RETURNING *`;
    return db.query(query);
  };

  return {
    getUsers,
    getProjects,
    createProject,
    editProject,
    deleteProject,
    getUserByEmail,
    addUser,
    createTask,
    getTasksByProjectId,
    editTask,
    deleteTask,
    addUsersToProject,
    getUsersByProjectId,
  };
};
