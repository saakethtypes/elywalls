import React, { useEffect, useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import auth from "../auth";

// @ts-ignore
import INDYWALLS_LOGO from '../assets/images/Logo.svg';

// @ts-ignore
import cn from './styles/Header.module.scss';
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

  const routeLogout = () => {
    logout();
    auth.logout(() => {
      history.push("/");
    });
  };

  return (
    <header className={cn.headerWrapper}>
      <div className={cn.headerContainer}>
        <Link to="/">
          <img src={INDYWALLS_LOGO} alt="INDYWALLS" />
        </Link>

        <div className={cn.headerMenuIcon} onClick={handleHamburgerClick}>
          <div id={cn.headerMenuIcon__lin1}></div>
          <div id={cn.headerMenuIcon__lin2}></div>
        </div>

        <div className={cn.headerLinkContainer}>

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
                  <Link to="/register?type=artist" className={cn.accountRegisterDropdown__artistButton}>
                    Register as Artist
                  </Link>
                </div>
              </div>

              <div className={`${cn.accountLoginLink}`}>
                <a href="/login" className={`${cn.accountSigninLink__signinLink}`}>
                  Sign In
                </a>
              </div></>}

            {/* Todo: rename classes to better fit purposes*/}

            {userLoggedIn && <>
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