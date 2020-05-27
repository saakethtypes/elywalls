import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

import { FormInput } from "../components/FormInput";
import { Link } from "react-router-dom";

// @ts-ignore
import cn from './styles/Login.module.scss';

export const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, persistLog } = useContext(GlobalContext);


  const loginUser = (e) => {
    e.preventDefault();
    login(username, password, props);
    setUsername("");
    setPassword("");
  };

  persistLog(props);

  return (
    <div className="page-container">
      <div className="page-heading">
        <h1 className="page-title">Sign In</h1>
        <p className="page-preface">Sign in to Admire and purchase products, or <Link to="/register">click here to register</Link>.</p>
      </div>
      <div className={cn.userSignInFormContainer}>
        <form className={cn.userSignInForm} onSubmit={loginUser}>
          <FormInput
            type="text"
            name="username"
            inputProps={{
              required: true,
              value: username,
              onChange: (e) => setUsername(e.target.value)
            }}
          />

          <FormInput
            type="password"
            name="password"
            inputProps={{
              required: true,
              value: password,
              onChange: (e) => setPassword(e.target.value)
            }}
          />
          <button type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
