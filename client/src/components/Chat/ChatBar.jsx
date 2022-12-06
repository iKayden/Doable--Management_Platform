import React, { useEffect, useState } from 'react';
import { getUsers } from '../../api/user';
import { useApplicationDispatch } from '../../hooks/useApplicationData';
import './ChatBar.css';

const ChatBar = ({ socket }) => {
  const dispatch = useApplicationDispatch();
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (socket) {
      socket.on('newUserResponse', (data) => setActiveUsers(data));
    }
  }, [socket]);

  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>

      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {activeUsers.map((user) => (
            <div className="chat__active-user" key={user.socketID}>
              <img
                className="active-users__avatar"
                src={user.avatar}
                alt={user.userName}
              />
              <p>{user.userName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
