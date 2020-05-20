import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
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
                            <li><a href="/">
                                Home
                            </a></li>
                            <li><a href="/">
                                Likes
                            </a></li>
                            <li><a href="/">
                                Orders
                            </a></li>
                        </ul>
                    </nav>

                    <div className={cn.accountPanel}>
                        <div className={`${cn.accountRegister}`}>
                            <LinkButton
                                href="/register?as=buyer"
                                classNames={`${cn.accountRegisterButton__buyerButton}`}>
                                Register
                            </LinkButton>

                            <div className={cn.accountRegister__dropdown}>
                                <span className={cn.accountRegisterDropdown__labelOr}>
                                    or
                                </span>
                                <a href="/register?as=artist" className={cn.accountRegisterDropdown__artistButton}>
                                    Register as Artist
                                </a>
                            </div>
                        </div>

                        <div className={`${cn.accountLoginLink}`}>
                            <a href="/signin" className={`${cn.accountSigninLink__signinLink}`}>
                                Sign In
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};