import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { createProject } from '../api/project';
import {
  useApplicationDispatch,
  useApplicationState,
} from '../hooks/useApplicationData';
import { CLOSE_ADD_PROJ } from '../reducer/data_reducer';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { getUsers } from '../api/user';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

export default function ProjectForm() {
  const dispatch = useApplicationDispatch();
  const { projectToAdd, users } = useApplicationState();
  const [project, setProject] = useState({
    name: '',
    description: '',
    start_date: '',
    expected_end_date: '',
    assigned_users: [],
  });

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const animatedComponents = makeAnimated();

  const userList = users.map((user) => ({
    value: user.id,
    label: user.name + ': ' + user.email,
  }));

  return (
    <Modal show={projectToAdd}>
      <Modal.Header
        closeButton
        onClick={() => {
          dispatch({
            type: CLOSE_ADD_PROJ,
          });
        }}
      >
        <Modal.Title>Add a New Project</Modal.Title>
      </Modal.Header>

      <Form
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          createProject(dispatch, project);
          dispatch({
            type: CLOSE_ADD_PROJ,
          });
        }}
      >
        <Modal.Body>
          <input
            type="text"
            name="name"
            placeholder="Enter Project Name"
            value={project.name}
            onChange={(event) =>
              setProject((prev) => ({ ...prev, name: event.target.value }))
            }
          />

          <div>
            <input
              type="text"
              name="description"
              placeholder="Enter Project Description"
              value={project.description}
              onChange={(event) =>
                setProject((prev) => ({
                  ...prev,
                  description: event.target.value,
                }))
              }
            />
          </div>
          <Form.Group controlId="dob">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="start_date"
              placeholder="Start Date"
              value={moment(project.start_date).format('YYYY-MM-DD')}
              onChange={(event) => {
                setProject((prev) => ({
                  ...prev,
                  start_date: moment(event.target.value).toISOString(),
                }));
              }}
            />
          </Form.Group>
          <Form.Group controlId="dob">
            <Form.Label>Expected Completion Date</Form.Label>
            <Form.Control
              type="date"
              name="expected_end_date"
              placeholder="Expected End Date"
              value={moment(project.expected_end_date).format('YYYY-MM-DD')}
              onChange={(event) => {
                setProject((prev) => ({
                  ...prev,
                  expected_end_date: moment(event.target.value).toISOString(),
                }));
              }}
            />
          </Form.Group>
          <Form.Group controlId="dob">
            <Form.Label>Add team members:</Form.Label>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={userList}
              type="assigned_users"
              name="assigned_users"
              defaultValue={[]}
              onChange={(event) => {
                const assigned_users = event;
                setProject((prev) => ({
                  ...prev,
                  assigned_users: assigned_users,
                }));
              }}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              dispatch({
                type: CLOSE_ADD_PROJ,
              });
            }}
          >
            Close
          </Button>
          {/* disable is used to disable submit button if name is missing. */}
          <Button
            variant="primary"
            type="submit"
            disabled={
              project.name === '' ||
              project.assigned_users.length === 0 ||
              project.expected_end_date === '' ||
              project.start_date === '' ||
              project.description === ''
            }
          >
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
