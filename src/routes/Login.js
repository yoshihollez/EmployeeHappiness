import React, { useState } from "react";
import "./Rating.css";
import { Button } from "react-materialize";
import { useMutation, useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";
import "./Login.css";

const LOGIN = gql`
  query login($password: String!, $username: String!) {
    login(password: $password, username: $username) {
      errors {
        field
        message
      }
      user {
        id
        username
      }
    }
  }
`;
const CREATE_USER = gql`
  mutation CreateUser($password: String!, $username: String!) {
    createUser(password: $password, username: $username) {
      errors {
        field
        message
      }
      user {
        id
        username
      }
    }
  }
`;
export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, { loading, error, data }] = useLazyQuery(LOGIN, {
    variables: {
      password: password,
      username: username,
    },
  });
  const [createUser] = useMutation(CREATE_USER, {
    variables: {
      password: password,
      username: username,
    },
  });

  if (data) {
    console.log(data);
  }

  return (
    <div className="container">
      <div className="inputBox">
        <p>Username</p>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
        />
        <p>password</p>
        <input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
        />
      </div>
      <div className="buttons">
        <Button
          onClick={() => {
            login();
          }}
        >
          Login
        </Button>
        <Button
          onClick={() => {
            createUser();
          }}
        >
          Register
        </Button>
      </div>
    </div>
  );
}
