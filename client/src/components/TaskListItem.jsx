import { deleteTask } from '../api/task';
import { useApplicationDispatch } from '../hooks/useApplicationData';
import Button from 'react-bootstrap/Button';
import { OPEN_EDIT_TASK } from '../reducer/data_reducer';

export default function TaskListItem({ task }) {
  const dispatch = useApplicationDispatch();
  //only year, date, time
  const formattedDate = new Date(task.deadline)
    .toString()
    .split(' ')
    .slice(0, 5)
    .join(' ');

  return (
    <tr key={task.id}>
      <th>{task.name}</th>
      <th>{task.status}</th>
      <th>{formattedDate}</th>
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
              task,
            });
          }}
        >
          Edit
        </Button>
      </th>
    </tr>
  );
}
