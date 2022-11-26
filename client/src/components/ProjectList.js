import "./ProjectList.css";
import useApplicationData from "../hooks/useApplicationData";

export default function ProjectList() {

  const {
    state,
    dispatch,
    deleteProject,
    createProject,
    editProject
  } = useApplicationData();

  return state.projects.map((project) => (
    <li key={project.id}>
      <p>{project.name}</p>
      <p>{project.description}</p>
      <p>{project.start_date}</p>
      <p>{project.expected_end_date}</p>
      <button onClick={() => { deleteProject(project.id); }} >
        Delete
      </button>
      <hr />
    </li>
  ));
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
