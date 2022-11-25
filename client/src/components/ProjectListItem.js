import { useApplicationDispatch } from '../hooks/useApplicationData';
import { deleteProject } from '../api/project';

export default function ProjectListItem(props) {
  const dispatch = useApplicationDispatch();
  return (
    <tr key={props.id}>
      <th>{props.name}</th>
      <th>{props.start_date}</th>
      <th>{props.expected_end_date}</th>
      <th>{props.description}</th>
      <th>
        <button
          onClick={() => {
            deleteProject(dispatch, props.id);
          }}
        >
          Delete
        </button>
      </th>
    </tr>
  );
}
