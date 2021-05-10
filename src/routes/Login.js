import React, { useState } from "react";
import "./Rating.css";
import { Button } from "react-materialize";
import { useMutation, useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";
import "./Login.css";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
// API call to graphql backend to login, also sets a cookie so you can stay logged in for 30min.
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

// API call to graphql backend to create a new user.
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
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [checkForError, setCheckForError] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [createUserData, setCreateUserData] = useState();
  const [userLogin, { loading, error, data }] = useLazyQuery(LOGIN, {
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

  if (
    checkForError &&
    (data?.login.errors || createUserData?.data.createUser.errors)
  ) {
    let errorField;
    let errorMessage = data?.login.errors
      ? data?.login.errors[0].message
      : createUserData?.data.createUser.errors[0].message;
    if (data) {
      errorField =
        data?.login.errors[0].field == "username" ? "username" : "password";
    } else {
      errorField =
        createUserData?.data.createUser.errors[0].field == "username"
          ? "username"
          : "password";
    }
    console.log(errorField);
    if (errorField == "username") {
      setPasswordError(false);
      setUsernameError(true);
      setUsernameErrorMessage(errorMessage);
      setPasswordErrorMessage("");
    } else {
      setUsernameError(false);
      setPasswordError(true);
      setPasswordErrorMessage(errorMessage);
      setUsernameErrorMessage("");
    }
    setCheckForError(false);
  }
  if (data?.login.user || createUserData?.data.createUser.user) {
    let name = "";
    console.log(data);
    if (createUserData) name = createUserData.data.createUser.user.username;
    if (data?.login) name = data.login.user.username;
    return (
      <div>
        <h3>You have succesfully logged in as {name}.</h3>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="inputBox">
          <p>Username</p>
          <TextField
            error={usernameError}
            id="username"
            label="username"
            defaultValue=""
            helperText={usernameErrorMessage}
            onChange={(e) => setUsername(e.target.value)}
          />
          <p>password</p>
          <TextField
            error={passwordError}
            id="password"
            label="password"
            type="password"
            defaultValue=""
            helperText={passwordErrorMessage}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="buttons">
          <Button
            onClick={() => {
              userLogin();
              setCheckForError(true);
            }}
          >
            Login
          </Button>
          <Button
            onClick={async () => {
              setCreateUserData(await createUser());
              setCheckForError(true);
            }}
          >
            Register
          </Button>
        </div>
      </div>
    );
  }
}
