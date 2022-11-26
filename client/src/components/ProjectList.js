import { useEffect } from 'react';
import axios from 'axios';

import './ProjectList.css';
import {
  useApplicationState,
  useApplicationDispatch,
} from '../hooks/useApplicationData';
import { SET_PROJECTS } from '../reducer/data_reducer';
import ProjectListItem from './ProjectListItem';

export default function ProjectList() {
  const { projects } = useApplicationState();
  const dispatch = useApplicationDispatch();

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/projects',
    })
      .then(({ data }) => {
        dispatch({
          type: SET_PROJECTS,
          projects: data,
        });
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  const projectList = projects.map((project) => {
    return (
      <ProjectListItem
        key={project.id}
        id={project.id}
        name={project.name}
        start_date={project.start_date}
        expected_end_date={project.expected_end_date}
        description={project.description}
      />
    );
  });
  return (
    <table className="table table-light table-striped">
      <thead>
        <tr>
          <th scope="col">Project</th>
          <th scope="col">Start Date</th>
          <th scope="col">Expected End Date</th>
          <th scope="col">Description</th>
          <th scope="col">Delete Project</th>
        </tr>
      </thead>
      <tbody>{projectList}</tbody>
    </table>
  );
}

// <form
// autoComplete="off"
// onSubmit={(e) => {
//   e.preventDefault();
//   createProject(project);
// }} >
// <input type="text" name="name" placeholder="Enter Project Name" value={project.name} onChange={(event) => setProject((prev) => ({ ...prev, name: event.target.value }))} />
// <button type="submit">Add New Project</button>
// </form>
