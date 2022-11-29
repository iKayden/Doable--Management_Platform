import { useEffect } from "react";
import axios from "axios";
import ProjectForm from "./ProjectForm";
import Button from 'react-bootstrap/Button';
import "./ProjectList.css";
import {
  useApplicationState,
  useApplicationDispatch,
} from "../hooks/useApplicationData";
import { SET_PROJECTS, TO_ADD_PROJ } from "../reducer/data_reducer";
import ProjectListItem from "./ProjectListItem";

export default function ProjectList() {
  const { projects, projectToAdd } = useApplicationState();
  const dispatch = useApplicationDispatch();

  useEffect(() => {
    axios({
      method: "GET",
      url: "/api/projects",
    })
      .then(({ data }) => {
        dispatch({
          type: SET_PROJECTS,
          //list projects in reverse order so that new project is on the top
          projects: data.reverse(),
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const projectList = projects.map((project) => {
    // converting date to readable date string
    const startDateString = new Date(project.start_date).toDateString()
    const endDateString = new Date(project.expected_end_date).toDateString()

    return (
      <ProjectListItem
        key={project.id}
        id={project.id}
        name={project.name}
        start_date={startDateString}
        expected_end_date={endDateString}
        description={project.description}
      />
    );
  });
  return (
    <>
    {projectToAdd && <ProjectForm projectToAdd={projectToAdd} />}
      <Button variant="primary"
        onClick={() => {
          dispatch({ type: TO_ADD_PROJ})
        }}
      >
        Add New Project
      </Button>


      <table className="table table-light table-striped">
        <thead>
          <tr>
            <th scope="col">Project</th>
            <th scope="col">Start Date</th>
            <th scope="col">Expected End Date</th>
            <th scope="col">Description</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>{projectList}</tbody>
      </table>
    </>
  );
}
