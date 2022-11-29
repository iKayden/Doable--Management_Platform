import { useState } from 'react';
import { useParams } from "react-router-dom";
import { createTask } from '../api/task';
import { useApplicationDispatch, useApplicationState } from '../hooks/useApplicationData';

export default function TaskForm(props) {
  const { id } = useParams();
  const dispatch = useApplicationDispatch();
  const [task, setTask] = useState({ name: '', description: '', assigned_user_id: null, project_id: id });
  const { users } = useApplicationState();
  const [selectedUser, setSelectedUser] = useState({});

  // Function to display all users for select in Add New Task
  const userList = users.map(user =>
    <option value={user.id} key={`${user.id}${user.name}`} >{user.email}</option>
  );

  const newAssignedUser = (selectedUser, task) => {
    return { ...task, assigned_user_id: selectedUser };
  };

  const handleSubmit = event => {
    event.preventDefault();
    createTask(dispatch, newAssignedUser(selectedUser, task));
    setTask((prev) => ({ ...prev, description: "" }));
    setTask((prev) => ({ ...prev, name: "" }));
  };

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div className="container">
        <div className='d-inline'>

          <label htmlFor="name" className='m-3'>Task Name:</label>
          <input
            id='name'
            className='m-3'
            type="text"
            name="name"
            placeholder="Enter Task Name"
            value={task.name}
            onChange={(event) =>
              setTask((prev) => ({ ...prev, name: event.target.value }))
            }
          />
        </div>
        <div className='d-inline'>

          <label htmlFor="description" className='m-3'>Task Description:</label>
          <input
            id='description'
            type="text"
            name="description"
            className='m-3'
            placeholder="Enter Task description"
            value={task.description}
            onChange={(event) =>
              setTask((prev) => ({ ...prev, description: event.target.value }))
            }
          />
        </div>
        <div className='d-inline'>
          <label htmlFor="assigned_user_id" className='m-3'>Assign a user:</label>
          <select
            name="assigned_user_id"
            id="assigned_user_id"
            onChange={(e) => {
              setSelectedUser(e.target.value);
            }}>
            <option value="" >--Please assign a user--</option>
            {userList}
          </select>
          <button type="submit" className="btn btn-warning m-3">Add</button>
        </div>
      </div>
    </form>
  );
}
