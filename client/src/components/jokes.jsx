import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../axiosWithAuth";

export default function Jokes(props) {
  const [jokes, setJokes] = useState([]);
  useEffect(() => {
    "joke get";
    axiosWithAuth()
      .get("/jokes")
      .then(res => setJokes(res.data))
      .catch(err => console.log("error", err));
  }, []);
  return (
    <>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          props.history.push("/login");
        }}
      >
        Logout
      </button>
      <h2>Jokes</h2>
      {jokes.map(joke => (
        <div key={joke.id}>
          <p>{joke.joke}</p>
        </div>
      ))}
    </>
  );
}
