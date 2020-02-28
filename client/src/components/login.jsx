import React, { useState } from "react";
import axios from "axios";

export default function Register(props) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const onChangeHandler = evt => {
    setCredentials({
      ...credentials,
      [evt.target.name]: evt.target.value
    });
  };

  const onSubmitHandler = evt => {
    evt.preventDefault();
    axios
      .post("http://localhost:3300/api/auth/login", credentials)
      .then(res => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        props.history.push("/jokes");
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <label>
          Username:{" "}
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={onChangeHandler}
            placeholder="username"
            required
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={onChangeHandler}
            placeholder="password"
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
