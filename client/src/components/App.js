import './App.css';
import useApplicationData from '../hooks/useApplicationData';

const App = () => {
  const {
    state,
    dispatch
  } = useApplicationData();
  const userList = state.users.map((user) => (
    <li key={user.id} >
      <p>
        {user.name}
      </p>
      <img class="user--avatar" src={user.avatar} alt="avatar" />
      <p>
        {user.email}
      </p>
      <hr />

    </li>
  ));
  return (<div className="App" >
    <h1> Users </h1>
    <ul> {userList} </ul>
  </div >
  );
};

export default App;
