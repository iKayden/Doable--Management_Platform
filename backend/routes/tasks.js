const express = require('express');
const router = express.Router();

const {
  deleteTask,
  getTasksByProjectId,
  createTask,
  editTask,
} = require('../helpers/dbHelpers');

module.exports = ({
  deleteTask,
  getTasksByProjectId,
  createTask,
  editTask,
}) => {
  router.get('/', (req, res) => {
    getTasksByProjectId(req.query.projectId)
      .then((tasks) => {
        res.json(tasks.rows);
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.put('/:id', (req, res) => {
    const {
      name,
      description,
      status,
      deadline,
      completion_time,
      assigned_user_id,
      project_id,
    } = req.body;
    editTask(
      req.params.id,
      name,
      description,
      status,
      deadline,
      completion_time,
      assigned_user_id,
      project_id
    )
      .then((task) => {
        res.send({ task });
      })
      .catch((err) => {
        console.log('err from put', err.message);
        res.json({
          error: err.message,
        });
      });
  });

  router.post('/', (req, res) => {
    const { name, description, assigned_user_id, deadline, project_id } =
      req.body;
    createTask(name, description, assigned_user_id, deadline, project_id)
      .then((task) => {
        res.send({ task });
      })
      .catch((err) => {
        console.log('err from post', err.message);
        res.json({
          error: err.message,
        });
      });
  });

  router.delete('/:id', (req, res) => {
    deleteTask(req.params.id)
      .then(() => {
        res.send({ success: true });
      })
      .catch((err) => {
        console.log('err from delete', err.message);
        res.json({
          error: err.message,
        });
      });
  });

  return router;
};
