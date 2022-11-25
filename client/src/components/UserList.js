import "./UserList.css";
import useApplicationData from "../hooks/useApplicationData";

export default function UserList() {
  const { state } = useApplicationData();

  return state.users.map((user) => (
    <li key={user.id}>
      <p>{user.name}</p>
      <img className="user--avatar" src={user.avatar} alt="avatar" />
      <p>{user.email}</p>
      <hr />
    </li>
  ));
}
