import { useEffect } from 'react';
import axios from 'axios';

import './UserList.css';
import {
  useApplicationState,
  useApplicationDispatch,
} from '../hooks/useApplicationData';
import { SET_USERS } from '../reducer/data_reducer';

export default function UserList() {
  const { users } = useApplicationState();
  const dispatch = useApplicationDispatch();

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/users',
    })
      .then(({ data }) => {
        dispatch({
          type: SET_USERS,
          users: data,
        });
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  return users.map((user) => (
    <li key={user.id}>
      <p>{user.name}</p>
      <img className="user--avatar" src={user.avatar} alt="avatar" />
      <p>{user.email}</p>
      <hr />
    </li>
  ));
}
