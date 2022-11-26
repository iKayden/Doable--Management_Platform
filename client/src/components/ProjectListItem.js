import useApplicationData from '../hooks/useApplicationData';

export default function ProjectListItem(props) {
  const { deleteProject } = useApplicationData();
  return (
    <li key={props.id}>
      <p>{props.name}</p>
      <p>{props.start_date}</p>
      <p>{props.expected_end_date}</p>
      <p>{props.description}</p>
      <button
        onClick={() => {
          deleteProject(props.id);
        }}
      >
        Delete
      </button>
      <hr />
    </li>
  );
}
