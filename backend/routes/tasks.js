const express = require('express');
const router = express.Router();

const {
  deleteTask,
  getTasksByProjectId,
} = require('../helpers/dbHelpers');

module.exports = ({
  deleteTask,
  getTasksByProjectId,
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

  // project/:id/task/:id
  // task/:id

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
