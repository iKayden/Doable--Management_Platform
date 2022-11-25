const express = require('express');
const router = express.Router();
const { getProjects, deleteProject, createProject } = require('../helpers/dbHelpers');
module.exports = ({
  getProjects,
  deleteProject,
  createProject
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

  router.post('/', (req, res) => {
    const { name, description, start_date, expected_end_date } = req;
    createProject(name, description, start_date, expected_end_date)
      .then(() => {
        res.send({ success: true });
      })
      .catch((err) => {
        console.log("err from post", err.message);
        res.json({
          error: err.message
        });
      });
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
