import { useEffect, useState } from 'react';

import { useApplicationState } from '../hooks/useApplicationData';
import { getTasksForProject } from '../api/task';

export default function TaskList() {
  const { projectId } = useApplicationState();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasksForProject(projectId).then((data) => setTasks(data));
  }, [projectId]);

  return tasks.map((task) => (
    <li key={task.id}>
      <p>{task.name}</p>
    </li>
  ));
}
