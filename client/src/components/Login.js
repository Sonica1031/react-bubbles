import React, { useState } from "react";
import axios from 'axios';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const onLogin = (e) =>{
    e.preventDefault();
    axios
    .post('http://localhost:5000/api/login', {username: username, password: password})
    .then(res => {
      localStorage.setItem("token", res.data.payload)
      props.history.push("/BubblePage")
    })
    .catch(err => {
      console.log(err)
    })
  }
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form>
        <input
        type="text"
        placeholder="Enter username"
        onChange={e => setUsername(e.target.value)}
        />
        <input
        type="password"
        placeholder="Enter password"
        onChange={e => setPassword(e.target.value)}
        />
        <button onClick={onLogin}>Login</button>
      </form>
    </>
  );
};

export default Login;
