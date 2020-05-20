import React, { useEffect, useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import auth from "../auth";

// @ts-ignore
import INDYWALLS_LOGO from '../assets/images/Logo.svg';

import cn from './Header.module.scss';
import LinkButton from './LinkButton';

/* export const Header = () => {
  

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
*/

export default () => {
  // Todo: remove JavaScript header click dependency by using adjacent element selector in CSS
  const handleHamburgerClick = () => {
    // document.getElementsByTagName('header')[0].classList.toggle(cn.headerWrapper__headerOpen);
  };

  const history = useHistory();

  const {
    log_status: userLoggedIn,
    logout
  } = useContext(GlobalContext);

  const routeHome = () => {
    let path = `/`;
    history.push(path);
  };
  const routeLogin = () => {
    let path = `/login`;
    history.push(path);
  };
  const routeRegisterUser = () => {
    let path = `/register`;
    history.push(path);
  };
  const routeRegisterArtist = () => {
    let path = `/register-artist`;
    history.push(path);
  };
  const routeAdmires = () => {
    let path = `/admires`;
    history.push(path);
  };
  const routeProfile = () => {
    let path = `/myaccount`;
    history.push(path);
  };
  const routeCart = () => {
    let path = `/cart`;
    history.push(path);
  };
  const routeArtistProfile = () => {
    let path = `/eleworks`;
    history.push(path);
  };
  const routeLogout = () => {
    logout();
    auth.logout(() => {
      history.push("/");
    });
  };

  return (
    <header className={cn.headerWrapper}>
      <div className={cn.headerContainer}>
        <img src={INDYWALLS_LOGO} alt="INDYWALLS" />

        <div className={cn.headerMenuIcon} onClick={handleHamburgerClick}>
          <div id={cn.headerMenuIcon__lin1}></div>
          <div id={cn.headerMenuIcon__lin2}></div>
        </div>

        <div className={cn.headerLinkContainer}>
          <nav>
            <ul>
              <li><Link to="/">
                Home
              </Link></li>
              <li><Link to="/admires">
                Likes
              </Link></li>
              <li><Link to="/cart">
                Cart
              </Link></li>
            </ul>
          </nav>

          <div className={cn.accountPanel}>
            {!userLoggedIn && <>
              <div className={`${cn.accountRegister}`}>
                <LinkButton
                  href="/register"
                  classNames={`${cn.accountRegisterButton__buyerButton}`}>
                  Register
                </LinkButton>

                <div className={cn.accountRegister__dropdown}>
                  <span className={cn.accountRegisterDropdown__labelOr}>
                    or
                  </span>
                  <Link to="/register-artist" className={cn.accountRegisterDropdown__artistButton}>
                    Register as Artist
                  </Link>
                </div>
              </div>

              <div className={`${cn.accountLoginLink}`}>
                <a href="/signin" className={`${cn.accountSigninLink__signinLink}`}>
                  Sign In
                </a>
              </div></>}

            {userLoggedIn && <> // Todo: rename classes to better fit purposes
              <div className={`${cn.accountRegister}`}>
                <LinkButton
                  href="/myaccount"
                  classNames={`${cn.accountRegisterButton__buyerButton}`}>
                  Account
                </LinkButton>
              </div>

              <div className={`${cn.accountLoginLink}`}>
                <a href="#" onClick={routeLogout}>
                  Sign Out
                </a>
              </div></>}
          </div>
        </div>
      </div>
    </header>
  );
};