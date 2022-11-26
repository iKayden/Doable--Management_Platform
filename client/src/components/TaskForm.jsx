import { useState } from 'react';
import { useParams } from "react-router-dom";
import { createTask } from '../api/task';
import { useApplicationDispatch, useApplicationState } from '../hooks/useApplicationData';
import Button from 'react-bootstrap/Button';
import { CLOSE_ADD_TASK } from '../reducer/data_reducer';

export default function TaskForm(props) {
  const { id } = useParams();
  const dispatch = useApplicationDispatch();
  const [task, setTask] = useState({ name: '', description: '', assigned_user_id: 1, project_id: id });
  const { users } = useApplicationState();
  console.log("USER FROM TASK FORM", users);

  const userList = users.map(user =>
    <option value={user.email}>{user.email}</option>
  );


  return (
    <form
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
        createTask(dispatch, task);
      }}
    >
      <div className="container">
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
        <label for="assigned_user_id">Assign a user:</label>

        <select name="assigned_user_id" id="assigned_user_id">
          <option value="">--Please choose a user--</option>
          {userList}
        </select>
        <button type="submit" className="btn btn-warning">Add</button>
      </div>
    </form>
  );
}
