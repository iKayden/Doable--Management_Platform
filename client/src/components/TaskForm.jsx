import { useContext, useState } from 'react';
import { useParams } from "react-router-dom";
import { createTask } from '../api/task';
import { useApplicationDispatch } from '../hooks/useApplicationData';
import { UserContext } from './Home';
export default function TaskForm() {

  const user = useContext(UserContext);
  console.log("USER FROM CONTEXT OF THE FORM", user);

  const { id } = useParams();
  const dispatch = useApplicationDispatch();
  const [task, setTask] = useState({ name: '', description: '', assigned_user_id: user, project_id: id });


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
