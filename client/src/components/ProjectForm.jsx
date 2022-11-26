import { useState } from 'react';

import { createProject } from '../api/project';
import { useApplicationDispatch } from '../hooks/useApplicationData';

export default function ProjectForm() {
  const dispatch = useApplicationDispatch();
  const [project, setProject] = useState({ name: '', description: '' });

  return (
    <form
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
        createProject(dispatch, project);
      }}
    >
      <input
        type="text"
        name="name"
        placeholder="Enter Project Name"
        value={project.name}
        onChange={(event) =>
          setProject((prev) => ({ ...prev, name: event.target.value }))
        }
      />
      {/* disable is used to disable submit button if name is missing. */}
      <button type="submit" disabled={project.name === ''}>
        Add New Project
      </button>
    </form>
  );
}
