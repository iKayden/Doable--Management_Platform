import { useState } from 'react';

import { createTask } from '../api/task';
import { useApplicationDispatch } from '../hooks/useApplicationData';

export default function TaskForm() {
  const dispatch = useApplicationDispatch();
  const [task, setTask] = useState({ name: '', description: '' });

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
      <div class="container">
        <div class="row">
          <div class="col-md-12 bg-light text-right">
            <button type="button" class="btn btn-warning">Add</button>
          </div>
        </div>
      </div>
    </form>
  );
}
