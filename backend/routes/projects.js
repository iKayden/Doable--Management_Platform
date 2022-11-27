const express = require('express');
const router = express.Router();
const {
  getProjects,
  deleteProject,
  createProject,
  editProject,
} = require('../helpers/dbHelpers');
module.exports = ({
  getProjects,
  deleteProject,
  createProject,
  editProject,
}) => {
  router.get('/', (req, res) => {
    getProjects()
      .then((projects) => {
        res.json(projects);
      })
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.post('/', (req, res) => {
    const { name, description, start_date, expected_end_date } = req.body;
    createProject(name, description, start_date, expected_end_date)
      .then((project) => {
        res.send({ project });
      })
      .catch((err) => {
        console.log('err from post', err.message);
        res.json({
          error: err.message,
        });
      });
  });

  router.put('/:id', (req, res) => {
    const { name, description, start_date, expected_end_date } = req.body;
    console.log("TEST =========>", req.body);
    editProject(req.params.id, name, description, start_date, expected_end_date)
      .then((project) => {
        res.send({ project });
      })
      .catch((err) => {
        console.log('err from post', err.message);
        res.json({
          error: err.message,
        });
      });
  });

  router.delete('/:id', (req, res) => {
    deleteProject(req.params.id)
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
