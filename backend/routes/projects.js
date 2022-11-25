const express = require('express');
const router = express.Router();
const { getProjects, deleteProject } = require('../helpers/dbHelpers');
module.exports = ({
  getProjects,
  deleteProject
}) => {
  router.get('/', (req, res) => {
    getProjects()
      .then((projects) => {
        res.json(projects);
      })
      .catch((err) => res.json({
        error: err.message
      }));
  });
  router.delete('/:id', (req, res) => {
    deleteProject(req.params.id)
      .then(() => {
        res.send({ success: true });
      })
      .catch((err) => {
        console.log("err from delete", err.message);
        res.json({
          error: err.message
        });
      });
  });
  return router;
};
