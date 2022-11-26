import './ProjectList.css';
import useApplicationData from '../hooks/useApplicationData';
import ProjectListItem from './ProjectListItem';

export default function ProjectList() {
  const { state, createProject } = useApplicationData();
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
    <table class="table table-light table-striped">
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
