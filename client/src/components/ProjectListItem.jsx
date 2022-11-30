import {
  useApplicationDispatch,
  useApplicationState,
} from '../hooks/useApplicationData';
import { deleteProject, updateProject } from '../api/project';
import { OPEN_UPDATE_PROJECT, SET_PROJECT } from '../reducer/data_reducer';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import EditProjectForm from './EditProjectForm';
// useParams
export default function ProjectListItem({
  project,
  expected_end_date,
  start_date,
}) {
  // extract current path (url)
  const dispatch = useApplicationDispatch();
  const { projectToEdit } = useApplicationState();

  return (
    <tr key={project.id}>
      <th
        onClick={() => {
          dispatch({ type: SET_PROJECT, id: project.id });
        }}
      >
        <Link to={`/projects/${project.id}/tasks`}>{project.name}</Link>
      </th>
      <th>{start_date}</th>
      <th>{expected_end_date}</th>
      <th>{project.description}</th>
      <th>
        <Button
          variant="warning"
          onClick={() => {
            dispatch({
              type: OPEN_UPDATE_PROJECT,
              project,
            });
          }}
        >
          Edit
        </Button>
      </th>
      {projectToEdit && <EditProjectForm projectToEdit={projectToEdit} />}

      <th>
        <Button
          variant="danger"
          onClick={() => {
            deleteProject(dispatch, project.id);
          }}
        >
          Delete
        </Button>
      </th>
    </tr>
  );
}
