import './ProjectList.css';
import useApplicationData from '../hooks/useApplicationData';
import ProjectListItem from './ProjectListItem';

export default function ProjectList() {
  const { state, deleteProject } = useApplicationData();
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
  return <ul>{projectList}</ul>;
}
