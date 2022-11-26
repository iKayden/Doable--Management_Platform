import './ProjectList.css';
import useApplicationData from '../hooks/useApplicationData';
import ProjectListItem from './ProjectListItem';

export default function ProjectList() {
  const { state } = useApplicationData();
  const projectList = state.projects.map((project) => {
    return (
      <ProjectListItem
        key={project.id}
        name={project.name}
        start_date={project.start_date}
        expected_end_date={project.expected_end_date}
        description={project.description}
      />
    );
  });
  return (
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Project</th>
          <th scope="col">Start Date</th>
          <th scope="col">Expected End Date</th>
          <th scope="col">Description</th>
        </tr>
      </thead>
      <tbody>{projectList}</tbody>
    </table>
  );
}
