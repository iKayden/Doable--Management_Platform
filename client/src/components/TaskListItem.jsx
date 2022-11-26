import { deleteTask } from "../api/task";
import { useApplicationDispatch } from "../hooks/useApplicationData";

export default function TaskListItem(props) {
  // extract current path (url)
  const dispatch = useApplicationDispatch();

  return (

    <tr key={props.id}>
      <th>{props.name}</th>
      <th>{props.status}</th>
      <th>{props.deadline}</th>
      <th>{props.assigned_user_id}</th>
      <th>{props.project_id}</th>
      <th>{props.description}</th>
      <th>
        <button
          onClick={() => {
            // deleteTask(dispatch, props.id);
          }}
        >
          Delete
        </button>
      </th>
    </tr>
  );
}
