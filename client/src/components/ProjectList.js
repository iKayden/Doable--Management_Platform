import "./ProjectList.css";
import useApplicationData from "../hooks/useApplicationData";

export default function ProjectList() {
  const { state, deleteProject } = useApplicationData();

  return state.projects.map((project) => (
    <li key={project.id}>
      <p>{project.name}</p>
      <p>{project.description}</p>
      <p>{project.start_date}</p>
      <p>{project.expected_end_date}</p>
      <button onClick={() => { deleteProject(project.id) }} >
        Delete
      </button>
      <hr />
    </li>
  ));
}
