// It needs to be changed completely!

module.exports = (db) => {
  const getUsers = () => {
    const query = {
      text: 'SELECT * FROM users',
    };

    return db.query(query).then((result) => result.rows);
  };

  const getProjects = () => {
    const query = {
      text: 'SELECT * FROM projects',
    };

    return db.query(query).then((result) => result.rows);
  };

  const createProject = (name, description, start_date, expected_end_date) => {
    const query = {
      text: `INSERT INTO projects (name, description, start_date, expected_end_date)
    VALUES ($1, $2, $3, $4) RETURNING *`,
      values: [name, description, start_date, expected_end_date],
    };

    return db.query(query).then((result) => result.rows[0]);
  };

  const editProject = (
    id,
    name,
    description,
    start_date,
    expected_end_date
  ) => {
    const query = {
      text: `
      UPDATE projects
      SET name = $2, description = $3, start_date = $4, expected_end_date = $5
      WHERE id = $1
      RETURNING *`,
      values: [id, name, description, start_date, expected_end_date],
    };
    return db.query(query);
  };

  const deleteProject = (id) => {
    const query = {
      text: 'DELETE FROM projects WHERE id = $1',
      values: [id],
    };
    return db.query(query);
  };

  const getTasksByProjectId = (id) => {
    const query = {
      text: `
      SELECT projects.name AS project_name, tasks.id, tasks.name, tasks.description, tasks.status, tasks.deadline, tasks.completion_time, tasks.assigned_user_id FROM projects JOIN tasks ON project_id=projects.id 
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

  const addUser = (name, avatar, email, password) => {
    const query = {
      text: `INSERT INTO users (name, avatar, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
      values: [name, avatar, email, password],
    };

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
    getTasksByProjectId,
  };
};
