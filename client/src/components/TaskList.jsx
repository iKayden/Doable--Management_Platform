import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTasksForProject } from "../api/task";
import TaskListItem from "./TaskListItem";
import {
  useApplicationState,
  useApplicationDispatch,
} from '../hooks/useApplicationData';
import { SET_TASKS } from '../reducer/data_reducer';

export default function TaskList() {
  const { projectId, tasks } = useApplicationState();
  const dispatch = useApplicationDispatch();

  const { id } = useParams();
  console.log("id from TaskList", id);

  useEffect(() => {
    getTasksForProject(id)
      .then((data) => {
        dispatch({
          type: SET_TASKS,
          tasks: data,
        });
      });
  }, [id]);

  const taskList = tasks.map((task) => {
    return (
      <TaskListItem
        key={task.id}
        id={task.id}
        name={task.name}
        status={task.status}
        deadline={task.deadline}
        assigned_user_id={task.assigned_user_id}
        project_id={task.project_id}
        description={task.description}
      />
    );
  });

  return (
    <>
      <table className="table table-light table-striped">
        <thead>
          <tr>
            <th scope="col">Task</th>
            <th scope="col">Status</th>
            <th scope="col">Deadline</th>
            <th scope="col">Assigned User</th>
            <th scope="col">Project ID</th>
            <th scope="col">Description</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>{taskList}</tbody>
      </table>

    </>
  );
}
