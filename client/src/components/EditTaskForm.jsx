import { useState } from 'react';
import { useParams } from "react-router-dom";
import { updateTask } from '../api/task';
import { useApplicationDispatch } from '../hooks/useApplicationData';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { CLOSE_EDIT_TASK } from '../reducer/data_reducer';

export default function EditTaskForm(props) {
  const { id } = useParams();
  const dispatch = useApplicationDispatch();
  const [task, setTask] = useState(props.taskToEdit);
  return (
    <Modal show={props.show}>
      <Modal.Header closeButton onClick={() => {
        dispatch({
          type: CLOSE_EDIT_TASK
        });
      }} >
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            updateTask(dispatch, task);
          }}
        >
          <Form.Group>

            <Form.Control
              type="text"
              name="name"
              placeholder="Enter Task Name"
              value={task.name}
              onChange={(event) =>
                setTask((prev) => ({ ...prev, name: event.target.value }))
              }
              required
            />
          </Form.Group>
          <Form.Group>

            <Form.Control
              as="textarea"
              name="description"
              placeholder="Enter Task description"
              value={task.description}
              required
              onChange={(event) =>
                setTask((prev) => ({ ...prev, description: event.target.value }))
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => {
          dispatch({
            type: CLOSE_EDIT_TASK
          });
        }}>Close</Button>
        <Button variant="primary" type="submit" block>Save changes</Button>
      </Modal.Footer>
    </Modal>
  );
}

