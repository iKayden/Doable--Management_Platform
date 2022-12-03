import './TaskListItem.css';
import React from 'react';

export default function TaskListItem({ task }) {

  //only year, date, time
  const formattedDate = new Date(task.deadline)
    .toString()
    .split(' ')
    .slice(0, 5)
    .join(' ');

  return (
    <table>
      <tr>
        <th>Task Status:</th>
        <td>{task.status}</td>
      </tr>
      <tr>
        <th>Deadline:</th>
        <td>{formattedDate}</td>
      </tr>
      <tr>
        <th>Assignee:</th>
        <td>{task.user_name}</td>
      </tr>
      <tr>
        <th>Description:</th>
        <td>{task.description}</td>
      </tr>
    </table>
  );
}
