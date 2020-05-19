import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import auth from "../auth";

export const Header = () => {
  const history = useHistory();
  const { log_status,logout } = useContext(GlobalContext);
  const routeHome = () => {
    let path = `/`;
    history.push(path);
  };

  const routeLogin = () => {
    let path = `/login`;
    history.push(path);
  };

  const routeRu = () => {
    let path = `/register`;
    history.push(path);
  };
  const routeRa = () => {
    let path = `/register-artist`;
    history.push(path);
  };
  const routeAd = () => {
    let path = `/admires`;
    history.push(path);
  };
  const routePr = () => {
    let path = `/myaccount`;
    history.push(path);
  };
  const routeCa = () => {
    let path = `/cart`;
    history.push(path);
  };
  const routeAp = () => {
    let path = `/eleworks`;
    history.push(path);
  };
  const routeLo = () => {
    logout();
    auth.logout(() => {
      history.push("/");
    });
  }

  return (
    <div>
      <div onClick={routeHome}>Elywalls</div>
      <br />
      {log_status ? (
        <div>
          <button onClick={routeAd}>Admires</button>
          <button onClick={routePr}>Profile</button>
          <button onClick={routeCa}>Cart</button>
          <button onClick={routeLo}>Logout</button>
        </div>
      ) : (
        <div>
          <button onClick={routeLogin}>Login</button>
          <button onClick={routeRu}>Register</button>
          <button onClick={routeRa}>Register as artist</button>
        </div>
      )}
    </div>
  );
};