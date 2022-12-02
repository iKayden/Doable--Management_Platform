import React, { useState } from 'react';
import './Login.css';

export default function Login(props, { socket }) {
  const url = '/';

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userName, setUserName] = useState('');
  const [error, setError] = useState();

  const handleSubmit = function(event) {
    event.preventDefault();
    fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then((data) => {
        localStorage.setItem('user', data.id);
        localStorage.setItem('userName', data.name);
        props.setUser(data.name);
        setError('');
      })
      .catch((err) => {
        if (err) {
          console.log(err);
          err.json()
            .then((json) => {
              setError(json.message);
            });
        }
      });
  };

  return (
    <div className="login">
      <h3>
        Please login or <a href={url}>create a new account</a>.
      </h3>
      <form onSubmit={handleSubmit}>
        <div>{error}</div>
        <label>
          <p>Email</p>
          <input
            type="text"
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
