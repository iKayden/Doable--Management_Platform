import React, { useState } from "react";
import {
  useApplicationDispatch,
  useApplicationState,
} from "../hooks/useApplicationData";
import ProgressBar from "react-bootstrap/ProgressBar";
import { OPEN_UPDATE_PROJECT, SET_PROJECT } from "../reducer/data_reducer";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import EditProjectForm from "./EditProjectForm";
import DeleteConfirmation from "./DeleteConfirmation";
import { deleteProject } from "../api/project";

export default function ProjectListItem({
  project,
  expected_end_date,
  start_date,
  progress,
}) {
  // extract current path (url)
  const dispatch = useApplicationDispatch();
  const { projectToEdit } = useApplicationState();

  // To display delete confirmation message
  const [showDelete, setShowDelete] = useState(false);
  const handleShow = () => setShowDelete(true);

  return (
    <tr key={project.id}>
      <th
        onClick={() => {
          dispatch({ type: SET_PROJECT, id: project.id });
        }}
      >
        <Link to={`/projects/${project.id}/tasks`}>{project.name}</Link>
      </th>
      <th>
        <ProgressBar
          variant={`${progress === 100 ? "success" : ""}`}
          now={progress}
          label={`${progress}%`}
        />
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
            handleShow();
          }}
        >
          Delete
        </Button>
        {showDelete && (
          <DeleteConfirmation
            showDelete={showDelete}
            setShowDelete={setShowDelete}
            handleDelete={() => {
              deleteProject(dispatch, project.id);
            }}
          />
        )}
      </th>
    </tr>
  );
}
