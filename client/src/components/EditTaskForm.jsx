import { useState } from 'react';
import { useParams } from "react-router-dom";
import { createTask } from '../api/task';
import { useApplicationDispatch } from '../hooks/useApplicationData';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function TaskForm() {
  const { id } = useParams();
  const dispatch = useApplicationDispatch();
  const [task, setTask] = useState({ name: '', description: '', assigned_user_id: 1, project_id: id });

  return (
    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            createTask(dispatch, task);
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
        <Button variant="secondary">Close</Button>
        <Button variant="primary">Save changes</Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
}
