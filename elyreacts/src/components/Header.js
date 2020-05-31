import React, { useEffect, useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import auth from "../auth";

import LinkButton from './LinkButton';

// @ts-ignore
import INDYWALLS_LOGO from '../assets/images/Logo.svg';

// @ts-ignore
import cn from './styles/Header.module.scss';

export default () => {
  // Todo: remove JavaScript header click dependency by using adjacent element selector in CSS
  const handleHamburgerClick = () => {
    // document.getElementsByTagName('header')[0].classList.toggle(cn.headerWrapper__headerOpen);
  };

  const history = useHistory();

  const {
    log_status: userLoggedIn,
    logout,
    user,
    persistLog
  } = useContext(GlobalContext);

  const routeLogout = () => {
    logout();
    auth.logout(() => {
      history.push("/");
    });
  };

  return (
    <header className={cn.container}>
      <div className={cn.content}>
        <Link to="/">
          <img src={INDYWALLS_LOGO} alt="INDYWALLS" />
        </Link>

        <div className={cn.hamburger} onClick={handleHamburgerClick}>
          <div></div>
          <div></div>
        </div>

        <div className={cn.linkContainer}>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/posters">Posters</Link>

            {user && user.user_type === "buyer" && <Link to="/admires">Admires</Link>}
            {user && user.user_type === "buyer" && <Link to="/cart">Cart</Link>}

            {user && user.user_type === "artist" && <Link to="/cart">Cart</Link>}
            {user && user.user_type === "artist" && <Link to="/account?view=published">Published</Link>}
            {user && user.user_type === "artist" && <LinkButton to="/publish-poster">New Poster</LinkButton>}
          </nav>

          <div className={cn.account}>
            {!user && <LinkButton className={cn.buttonRegister} primary to="/register">Register</LinkButton>}
            {!user &&
              <div className={cn.buttonRegister__dropdown}>
                <span>or</span>
                <Link to="/register?type=artist">
                  Register as Artist
                </Link>
              </div>}
            {!user && <Link to="/login">Sign In</Link>}

            {user && <LinkButton primary to="/account">Account</LinkButton>}
            {user && <button onClick={routeLogout}>Sign Out</button>}
          </div>
        </div>
      </div>
    </header>
  );
};