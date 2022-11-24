// It needs to be changed completely!

module.exports = (db) => {
  const getUsers = () => {
    const query = {
      text: 'SELECT * FROM users',
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getProjects = () => {
    const query = {
      text: 'SELECT * FROM projects',
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const deleteProject = (id) => {
    const query = {
      text: 'DELETE FROM projects WHERE id = $1',
      values: [id]
    };
    return db
      .query(query);
  };


  const getUserByEmail = email => {

    const query = {
      text: `SELECT * FROM users WHERE email = $1`,
      values: [email]
    };

    return db
      .query(query)
      .then(result => result.rows[0])
      .catch((err) => err);
  };

  const addUser = (name, avatar, email, password) => {
    const query = {
      text: `INSERT INTO users (name, avatar, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
      values: [name, avatar, email, password]
    };

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };


  return {
    getUsers,
    getProjects,
    deleteProject,
    getUserByEmail,
    addUser,
  };
};
