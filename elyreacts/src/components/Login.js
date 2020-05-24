import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

// @ts-ignore
import cn from './styles/Login.module.scss';

export const Login = (props) => {
  const [userName, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const { login } = useContext(GlobalContext);
  
  const loginUser = (e) => {
    e.preventDefault();
    login(userName, pass, props);
    setUsername("");
    setPass("");
  };
  return (
    <div className="page-container">
      <h1 className="title">Sign In</h1>
      <div className={cn.userSignInFormContainer}>
        <form className={cn.userSignInForm} onSubmit={loginUser}>
          <div id="Username">
            <input
              type="text"
              value={userName}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div id="Pass">
            <input
              type="password"
              placeholder="Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
          <button className="button" type="submit">
            Login
          </button>
          
        </form>
      </div>
    </div>
  );
};
