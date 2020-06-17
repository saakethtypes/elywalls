import React, { useEffect, useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import auth from "../auth";

import LinkButton from './LinkButton';

// @ts-ignore
import INDYWALLS_LOGO from '../assets/images/Logo.svg';

// @ts-ignore
import cn from './styles/Header.module.scss';

// todo: Try to tidy opening/closing of menu

export default () => {
  const [isHeaderOpen, setIsHeaderOpen] = useState(false);

  const closeMenu = () => {
    const menuEl = document.getElementById(cn.menuContainer);
    if (!menuEl) return;

    setIsHeaderOpen(false);

    menuEl.style.opacity = '0';
    menuEl.style.width = '50vw';
    menuEl.style.left = '-100%';
  };
  const openMenu = () => {
    const menuEl = document.getElementById(cn.menuContainer);
    if (!menuEl) return;

    setIsHeaderOpen(true);

    menuEl.style.opacity = '1';
    menuEl.style.width = '100vw';
    menuEl.style.left = '0';
  };

  const handleHamburgerClick = () => {
    if (isHeaderOpen) closeMenu();
    else openMenu();
  };

  const history = useHistory();

  const {
    log_status: userLoggedIn,
    logout,
    user,
    persistLog
  } = useContext(GlobalContext);

  const handleLogout = (e) => {
    closeMenu();

    logout();
    auth.logout(() => {
      history.push("/");
    });
  };

  return (
    <header className={cn.container}>
      <div className={cn.content}>
        <Link onClick={closeMenu} to="/">
          <img src={INDYWALLS_LOGO} alt="INDYWALLS" />
        </Link>

        <nav className={cn.mainNav}>
          <Link onClick={closeMenu} to="/">Home</Link>
          <Link onClick={closeMenu} to="/posters">Posters</Link>

          {user && user.user_type === "buyer" && <Link onClick={closeMenu} to="/admires">Admires</Link>}
          {user && user.user_type === "buyer" && <Link onClick={closeMenu} to="/cart">Cart</Link>}

          {/* Artist account shouldn't have cart should it? Why would it need a cart? */}
          {user && user.user_type === "artist" && <Link onClick={closeMenu} to="/admires">Admires</Link>}
          {user && user.user_type === "artist" && <Link onClick={closeMenu} to="/cart">Cart</Link>}
          {user && user.user_type === "artist" && <Link onClick={closeMenu} to={`/profile/${user.username}`}>Profile</Link>}
        </nav>

        <div className={cn.accountNav}>
          {user && user.user_type === "artist" && <LinkButton primary onClick={closeMenu} to="/publish-poster">New Poster</LinkButton>}

          {!user &&
            <div className={cn.buttonRegister__container}>
              <LinkButton className={cn.buttonRegister} primary onClick={closeMenu} to="/register">Register</LinkButton>

              <div className={cn.buttonRegister__dropdown}>
                <span>or</span>
                <Link onClick={closeMenu} to="/register?type=artist">
                  Register as Artist
                </Link>
              </div>
            </div>}
          {!user && <Link onClick={closeMenu} to="/login">Sign In</Link>}

          {user && <LinkButton primary onClick={closeMenu} to="/account">Account</LinkButton>}
          {user && <Link onClick={handleLogout} to="/">Sign Out</Link>}
        </div>
      </div>
    </header>
  );
};

// {user && user.user_type === "buyer" && <Link to="/admires">Admires</Link>}
//             {user && user.user_type === "buyer" && <Link to="/cart">Cart</Link>}

//             {user && user.user_type === "artist" && <Link to="/admires">Admires</Link>}
//             {user && user.user_type === "artist" && <Link to="/cart">Cart</Link>}
//             {user && user.user_type === "artist" && <Link to="/account?view=published">Published</Link>}
//             {user && user.user_type === "artist" && <LinkButton to="/publish-poster">New Poster</LinkButton>}
