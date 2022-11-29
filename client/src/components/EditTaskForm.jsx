import { useState } from 'react';
import { useParams } from "react-router-dom";
import { createTask, editTask, updateTask } from '../api/task';
import { useApplicationDispatch } from '../hooks/useApplicationData';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CLOSE_EDIT_TASK, EDIT_TASK } from '../reducer/data_reducer';

export default function EditTaskForm(props) {
  const { id } = useParams();
  const dispatch = useApplicationDispatch();
  const [task, setTask] = useState(props.taskToEdit);
  return (
    <Modal.Dialog>
      <Modal.Header closeButton onClick={() => {
        dispatch({
          type: CLOSE_EDIT_TASK
        });
      }} >
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            updateTask(dispatch, task);
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Enter Task Name"
            value={task.name}
            onChange={(event) =>
              setTask((prev) => ({ ...prev, name: event.target.value }))
            }
          />
          <input
            type="text"
            name="description"
            placeholder="Enter Task description"
            value={task.description}
            onChange={(event) =>
              setTask((prev) => ({ ...prev, description: event.target.value }))
            }
          />
          <div className="container">
            <button type="submit" className="btn btn-warning">Add</button>
          </div>
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => {
          dispatch({
            type: CLOSE_EDIT_TASK
          });
        }}>Close</Button>
        <Button variant="primary">Save changes</Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
}
