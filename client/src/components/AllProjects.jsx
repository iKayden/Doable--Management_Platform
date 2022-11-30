import { useApplicationState } from '../hooks/useApplicationData';
import ProjectList from './ProjectList';

export default function AllProjects() {
  const { projects } = useApplicationState();
  return <ProjectList projects={projects} />;
}
