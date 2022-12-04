import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import './Login.css';

export default function Login(props) {
  const url = '/';

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleSubmit = function (event) {
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
        localStorage.setItem('userAvatar', data.avatar);
        props.setUser(data.name);
        navigate('/');
        setError('');
      })
      .catch((err) => {
        if (err) {
          console.log(err);
          err.json().then((json) => {
            setError(json.message);
          });
        }
      });
  };

  return (
    <div className="login">
      <img className="logo-login" src="/doable_logo_new.png" alt="logo" />
      <h3>Welcome Back!</h3>
      {error ? <Alert variant={'danger'}>{error}</Alert> : ''}

      <form onSubmit={handleSubmit}>
        <Form.Group controlId="dob">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            placeholder="Enter email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="dob">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Button className="login-button" variant="primary" type="submit">
          Login
        </Button>
      </form>
      <div>
        Need an account?<a href={url}>Sign up</a>
      </div>
    </div>
  );
}
