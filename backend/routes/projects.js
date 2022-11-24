const express = require('express');
const router = express.Router();
const { getProjects } = require('../helpers/dbHelpers');
module.exports = ({
  getProjects
}) => {
  router.get('/projects', (req, res) => {
    getProjects()
      .then((projects) => {
        res.json(projects);
      })
      .catch((err) => res.json({
        error: err.message
      }));
  });
  return router;
};
