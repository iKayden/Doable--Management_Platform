import { createProject } from '../api/project';
import { useApplicationDispatch, useApplicationState } from '../hooks/useApplicationData';

export default function ProjectForm() {
  const { projects } = useApplicationState();
  const dispatch = useApplicationDispatch();

  return (
    <form
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
        createProject(dispatch, project);
      }} >
      <input
        type="text"
        name="name"
        placeholder="Enter Project Name"
        value={project.name}
        onChange={(event) => setProject((prev) => ({ ...prev, name: event.target.value }))}
      />
      <button type="submit">Add New Project</button>
    </form>
  );

}
