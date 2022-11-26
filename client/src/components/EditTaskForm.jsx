import { useState } from 'react';
import { useParams } from "react-router-dom";
import { createTask } from '../api/task';
import { useApplicationDispatch } from '../hooks/useApplicationData';

export default function TaskForm() {
  const { id } = useParams();
  const dispatch = useApplicationDispatch();
  const [task, setTask] = useState({ name: '', description: '', assigned_user_id: 1, project_id: id });


  return (
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
  );
}
