import { useApplicationDispatch, useApplicationState } from '../hooks/useApplicationData';
import { deleteProject, updateProject } from '../api/project';
import { OPEN_UPDATE_PROJECT, SET_PROJECT } from '../reducer/data_reducer';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import EditProjectForm from './EditProjectForm';
// useParams
export default function ProjectListItem(props) {
  // extract current path (url)
  const dispatch = useApplicationDispatch();
  const { projectToEdit } = useApplicationState();

  return (

    <tr key={props.id}>
      <th
        onClick={() => {
          dispatch({ type: SET_PROJECT, id: props.id });
        }}
      >
        <Link to={`projects/${props.id}/tasks`}>
          {props.name}
        </Link>
      </th>
      <th>{props.start_date}</th>
      <th>{props.expected_end_date}</th>
      <th>{props.description}</th>
      <th>
        <Button
          variant='warning'
          onClick={() => {
            updateProject({
              type: OPEN_UPDATE_PROJECT,
              props
            });
          }}
        >
          Edit
        </Button>
      </th>
      {projectToEdit && <EditProjectForm projectToEdit={projectToEdit} />}

      <th>
        <Button
          variant='danger'
          onClick={() => {
            deleteProject(dispatch, props.id);
          }}
        >
          Delete
        </Button>
      </th>
    </tr>
  );
}
