import ProjectForm from './ProjectForm';
import Button from 'react-bootstrap/Button';
import './ProjectList.css';
import {
  useApplicationState,
  useApplicationDispatch,
} from '../hooks/useApplicationData';
import { TO_ADD_PROJ } from '../reducer/data_reducer';
import ProjectListItem from './ProjectListItem';

export default function ProjectList(props) {
  const { projects } = props;
  const { projectToAdd } = useApplicationState();
  const dispatch = useApplicationDispatch();

  const projectList = projects.map((project) => {
    // converting date to readable date string
    const startDateString = new Date(project.start_date).toDateString();
    const endDateString = new Date(project.expected_end_date).toDateString();

    return (
      <ProjectListItem
        key={project.id}
        start_date={startDateString}
        expected_end_date={endDateString}
        project={project}
      />
    );
  });
  return (
    <>
      {projectToAdd && <ProjectForm projectToAdd={projectToAdd} />}

      <h1 className="d-inline">Projects</h1>
      <Button
        variant="primary"
        className="d-inline-block add--newProject__button"
        onClick={() => {
          dispatch({ type: TO_ADD_PROJ });
        }}
      >
        Add New Project
      </Button>

      <table className="table table-light table-striped">
        <thead>
          <tr>
            <th scope="col">Project</th>
            <th scope="col">Progress</th>
            <th scope="col">Start Date</th>
            <th scope="col">Expected End Date</th>
            <th scope="col">Description</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{projectList}</tbody>
      </table>
    </>
  );
}
