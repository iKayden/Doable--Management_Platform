const express = require('express');
const router = express.Router();
const { getTasksByProjectId } = require('../helpers/dbHelpers');

module.exports = ({ getTasksByProjectId }) => {
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

  return router;
};
