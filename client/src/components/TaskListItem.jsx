import { deleteTask, editTask } from "../api/task";
import { useApplicationDispatch } from "../hooks/useApplicationData";
import Button from 'react-bootstrap/Button';
import { OPEN_EDIT_TASK } from "../reducer/data_reducer";


export default function TaskListItem({ task }) {
  // extract current path (url)
  const dispatch = useApplicationDispatch();

  return (

    <tr key={task.id}>
      <th>{task.name}</th>
      <th>{task.status}</th>
      <th>{task.deadline}</th>
      <th>{task.assigned_user_id}</th>
      <th>{task.project_id}</th>
      <th>{task.description}</th>
      <th>
        <Button
          variant="danger"
          onClick={() => {
            deleteTask(dispatch, task.id);
          }}
        >
          Delete
        </Button>
      </th>
      <th>
        <Button
          onClick={() => {
            dispatch({
              type: OPEN_EDIT_TASK,
              task
            });
          }}
        >
          Edit
        </Button>
      </th>
    </tr>
  );
}
