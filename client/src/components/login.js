import React, { useState } from "react";
import "./Login.css";

export default function Login(props) {
  const url = "/";

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = function(event) {
    event.preventDefault();
  }

  return (
    <div className="login">
      <h3>
        Please login or <a href={url}>create a new account</a>.
      </h3>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type="text" onChange={event => setUsername(event.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={event => setPassword(event.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
