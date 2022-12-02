import './TaskListItem.css';
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
    <table>
      <tr>
        <th>Task Status:</th>
        <td>{task.status}</td>
      </tr>
      <tr>
        <th>Deadline:</th>
        <td>{formattedDate}</td>
      </tr>
      <tr>
        <th>Assignee:</th>
        <td>{task.user_name}</td>
      </tr>
      <tr>
        <th>Description:</th>
        <td>{task.description}</td>
        {/* <th>
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
        </th> */}
      </tr>
    </table>
  );
}
