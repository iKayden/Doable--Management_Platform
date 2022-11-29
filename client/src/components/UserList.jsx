import { useEffect } from 'react';
// need to use react Router (it's separate from server-side routing)
// wanna use link from React instead of <a></a>
import './UserList.css';
import {
  useApplicationState,
  useApplicationDispatch,
} from '../hooks/useApplicationData';
import { getUsers } from '../api/user';

export default function UserList() {
  const { users } = useApplicationState();
  const dispatch = useApplicationDispatch();
  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  return users.map((user) => (
    <div className="user--profile" key={user.id}>
      <p>{user.name}</p>
      <img className="user--avatar" src={user.avatar} alt="avatar" />
      <p>{user.email}</p>
      <hr />
    </div>
  ));
}
