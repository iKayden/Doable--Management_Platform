import { deleteTask, editTask } from "../api/task";
import { useApplicationDispatch } from "../hooks/useApplicationData";

export default function TaskListItem({ task }) {
  // extract current path (url)
  const dispatch = useApplicationDispatch();

  // console.log("Task ID", props.id);
  // // console.log("Tasks", tasks);
  // console.log("Dispatch", dispatch);
  // const updatedTask = (id, tasksArr) => {
  //   tasks()
  // }

  return (

    <tr key={task.id}>
      <th>{task.name}</th>
      <th>{task.status}</th>
      <th>{task.deadline}</th>
      <th>{task.assigned_user_id}</th>
      <th>{task.project_id}</th>
      <th>{task.description}</th>
      <th>
        <button
          onClick={() => {
            deleteTask(dispatch, task.id);
          }}
        >
          Delete
        </button>
      </th>
      <th>
        <button
          onClick={() => {
            // editTask(dispatch);
            editTask(dispatch, task);
          }}
        >
          Edit
        </button>
      </th>
    </tr>
  );
}
