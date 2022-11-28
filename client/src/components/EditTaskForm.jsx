import { useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { updateTask } from '../api/task';
import { useApplicationDispatch } from '../hooks/useApplicationData';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { CLOSE_EDIT_TASK } from '../reducer/data_reducer';

export default function EditTaskForm(props) {
  const { id } = useParams();
  const dispatch = useApplicationDispatch();
  const [task, setTask] = useState(props.taskToEdit || null);

  return (
    <Modal show={props.taskToEdit}>
      <Modal.Header
        closeButton
        onClick={() => {
          dispatch({
            type: CLOSE_EDIT_TASK,
          });
        }}
      >
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>

      <Form
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          updateTask(dispatch, task);
        }}
      >
        <Modal.Body>
          <Form.Group>
            <Form.Label>Task name</Form.Label>
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
            <Form.Label>Task description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              placeholder="Enter Task description"
              value={task.description}
              required
              onChange={(event) =>
                setTask((prev) => ({
                  ...prev,
                  description: event.target.value,
                }))
              }
            />
          </Form.Group>

          <Form.Group controlId="dob">
            <Form.Label>Deadline</Form.Label>
            <Form.Control
              type="datetime-local"
              name="start_date"
              placeholder="Start Date"
              defaultValue={moment(task.deadline).format('YYYY-MM-DDTHH:mm')}
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
                type: CLOSE_EDIT_TASK,
              });
            }}
          >
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
