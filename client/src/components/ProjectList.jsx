import ProjectForm from './ProjectForm';
import Button from 'react-bootstrap/Button';
import './ProjectList.css';
import {
  useApplicationState,
  useApplicationDispatch,
} from '../hooks/useApplicationData';
import { TO_ADD_PROJ } from '../reducer/data_reducer';
import ProjectListItem from './ProjectListItem';
import Footer from './Footer';

export default function ProjectList(props) {
  const { projects, title } = props;
  const { projectToAdd } = useApplicationState();
  const dispatch = useApplicationDispatch();

  const projectList = projects.map((project) => {
    // converting date to readable date string
    const startDateString = new Date(project.start_date).toDateString();
    const endDateString = new Date(project.expected_end_date).toDateString();

    const progressPercentage = Math.round(
      (project.completed_tasks / project.total_tasks) * 100
    );

    return (
      <ProjectListItem
        key={project.id}
        start_date={startDateString}
        expected_end_date={endDateString}
        project={project}
        progress={progressPercentage}
      />
    );
  });
  return (
    <>
      <div className="project-list">
        {projectToAdd && <ProjectForm projectToAdd={projectToAdd} />}
        <div className="projects__header">
          <h1 className="d-inline">{title}</h1>
        </div>

        <table className="table table-hover projects__table">
          <thead>
            <tr>
              <th scope="col">Project</th>
              <th scope="col">Progress</th>
              <th scope="col">Start Date</th>
              <th scope="col">Expected End Date</th>
              <th scope="col">Description</th>
              <th scope="col">Completion</th>
              <th scope="col" colSpan="2">
                <Button
                  variant="primary"
                  className="d-inline-block add--newProject__button"
                  onClick={() => {
                    dispatch({ type: TO_ADD_PROJ });
                  }}
                >
                  <i className="fa-solid fa-plus"></i> Add New Project
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>{projectList}</tbody>
        </table>
      </div>
      <Footer />
    </>
  );
}
