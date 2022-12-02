import moment from 'moment';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';

import { createTask } from '../api/task';
import { getUsersByProjectId } from '../api/user';
import {
  useApplicationDispatch,
  useApplicationState,
} from '../hooks/useApplicationData';
import { CLOSE_ADD_TASK } from '../reducer/data_reducer';

export default function TaskForm() {
  const { id } = useParams();
  const dispatch = useApplicationDispatch();
  const [task, setTask] = useState({
    name: '',
    description: '',
    assigned_user_id: null,
    project_id: id,
    deadline: '',
  });
  const [selectedUser, setSelectedUser] = useState({});
  const [projectUsers, setProjectUsers] = useState([]);

  useEffect(() => {
    getUsersByProjectId(id).then((users) => {
      setProjectUsers(users);
    });
  }, [id]);

  const { taskToAdd } = useApplicationState();
  // Function to display all users for select in Add New Task
  const userList = projectUsers.map((user) => (
    <option value={user.id} key={`${user.id}${user.name}`}>
      {user.name}: {user.email}
    </option>
  ));

  const newAssignedUser = (selectedUser, task) => {
    return { ...task, assigned_user_id: selectedUser };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createTask(dispatch, newAssignedUser(selectedUser, task))
      .then(() => {
        setTask((prev) => ({
          ...prev,
          name: '',
          description: '',
          deadline: '',
        }));
        dispatch({
          type: CLOSE_ADD_TASK,
        });
      })
      .catch((err) => {
        console.log('AXIOS PUT ERROR', err.message);
      });
  };

  return (
    <Modal show={taskToAdd}>
      <Modal.Header
        closeButton
        onClick={() => {
          dispatch({
            type: CLOSE_ADD_TASK,
          });
        }}
      >
        <Modal.Title>Add a New Task</Modal.Title>
      </Modal.Header>

      <form autoComplete="off" onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="dob">
            <Form.Label>Task name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter Task Name:"
              value={task.name}
              onChange={(event) =>
                setTask((prev) => ({ ...prev, name: event.target.value }))
              }
            />
          </Form.Group>

          <Form.Group controlId="dob">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Enter Task Description"
              value={task.description}
              onChange={(event) =>
                setTask((prev) => ({
                  ...prev,
                  description: event.target.value,
                }))
              }
            />
          </Form.Group>

          <Form.Group controlId="dob">
            <Form.Label>Assign a user</Form.Label>
            <Form.Select
              name="assigned_user_id"
              id="assigned_user_id"
              onChange={(e) => {
                setSelectedUser(e.target.value);
              }}
            >
              <option value="">--Please assign a user--</option>
              {userList}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="dob">
            <Form.Label>Deadline</Form.Label>
            <Form.Control
              type="datetime-local"
              name="start_date"
              placeholder="Start Date"
              value={moment(task.deadline).format('YYYY-MM-DDTHH:mm')}
              onChange={(event) => {
                setTask((prev) => ({
                  ...prev,
                  deadline: moment(event.target.value).toISOString(),
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
                type: CLOSE_ADD_TASK,
              });
            }}
          >
            Close
          </Button>
          {/* disable is used to disable submit button if name is missing. */}
          <Button variant="primary" type="submit" disabled={task.name === ''}>
            Save
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
