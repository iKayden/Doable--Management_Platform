import useApplicationData from '../hooks/useApplicationData';

export default function ProjectListItem(props) {
  const { deleteProject } = useApplicationData();
  return (
    <tr key={props.id}>
      <th>{props.name}</th>
      <th>{props.start_date}</th>
      <th>{props.expected_end_date}</th>
      <th>{props.description}</th>
      <th>
        <button
          onClick={() => {
            deleteProject(props.id);
          }}
        >
          Delete
        </button>
      </th>
    </tr>
  );
}
