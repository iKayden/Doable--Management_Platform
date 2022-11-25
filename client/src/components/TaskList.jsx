import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApplicationState } from '../hooks/useApplicationData';
import { getTasksForProject } from '../api/task';

export default function TaskList() {
  const { projectId } = useApplicationState();
  const [tasks, setTasks] = useState([]);
  // const { id } = useParams();
  console.log("project id from Task List", projectId);

  useEffect(() => {
    getTasksForProject(projectId)
      .then((data) => setTasks(data));
  }, [projectId]);

  return tasks.map((task) => (
    <li key={task.id}>
      <p>{task.name}</p>
    </li>
  ));
}
