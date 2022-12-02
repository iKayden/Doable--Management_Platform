import React, { useState } from 'react';
import { useApplicationDispatch } from '../hooks/useApplicationData';
import Button from 'react-bootstrap/Button';
import { OPEN_EDIT_TASK } from '../reducer/data_reducer';
import DeleteConfirmation from './DeleteConfirmation';
import { deleteTask } from '../api/task';

export default function TaskListItem({ task }) {
  const dispatch = useApplicationDispatch();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const handleDelete = () => {
    deleteTask(dispatch, task.id, task.status)
   }

  //only year, date, time
  const formattedDate = new Date(task.deadline)
    .toString()
    .split(' ')
    .slice(0, 5)
    .join(' ');

  return (
    <tr key={task.id}>
      <th>{task.name}</th>
      <th>{task.status}</th>
      <th>{formattedDate}</th>
      <th>{task.assigned_user_id}</th>
      <th>{task.project_id}</th>
      <th>{task.description}</th>
      <th>
      <Button
          variant="danger"
          onClick={handleShow}
        >
          Delete
        </Button>
        {show && <DeleteConfirmation show={show} setShow={setShow} handleDelete={handleDelete} />}
      </th>
      <th>
        <Button
          onClick={() => {
            dispatch({
              type: OPEN_EDIT_TASK,
              task,
            });
          }}
          >
          Edit
        </Button>
      </th>
    </tr>
  );
}
