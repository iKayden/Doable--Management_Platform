import { deleteTask, editTask } from "../api/task";
import { useApplicationDispatch } from "../hooks/useApplicationData";

export default function TaskListItem(props) {
  // extract current path (url)
  const dispatch = useApplicationDispatch();

  console.log("Task ID", props.id);
  // console.log("Tasks", tasks);
  console.log("Dispatch", dispatch);
  // const updatedTask = (id, tasksArr) => {
  //   tasks()
  // }

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
            deleteTask(dispatch, props.id);
          }}
        >
          Delete
        </button>
      </th>
      <th>
        <button
          onClick={() => {
            editTask(dispatch, props.id);
          }}
        >
          Edit
        </button>
      </th>
    </tr>
  );
}
