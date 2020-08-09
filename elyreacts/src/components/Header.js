import React, {  useContext, useState, useLayoutEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import auth from "../auth";

import LinkButton from "./LinkButton";

// @ts-ignore \n /*eslint-disable*/
 /*eslint-disable*/
 // todo: Add type defs for SVG, SCSS files
import LOGO from "../assets/images/Logo.svg";

// @ts-ignore \n /*eslint-disable*/
 /*eslint-disable*/

import cn from "./styles/Header.module.scss";

export default () => {
    const history = useHistory();
    const [menuOpen, setMenuOpen] = useState(false);

    const { logout: logoutFn, user } = useContext(GlobalContext);

    const handleLogout = (e) => {
        e.preventDefault();

        logoutFn();
        auth.logout(() => {
            history.push("/");
        });
    };

    useLayoutEffect(() => {
        const linkEls = document.querySelectorAll(
            `header.${cn.wrapper} .${cn.container} a`
        );
        linkEls.forEach((link) => {
            link.addEventListener("click", (e) => setMenuOpen(false));
        });
    });

    return (
        <header className={cn.wrapper}>
            <div className={cn.container}>
                <Link to='/' className={cn.logo}>
                    <img src={LOGO} alt='Elywalls' />
                </Link>

                <input
                    type='checkbox'
                    checked={menuOpen}
                    onChange={(e) => setMenuOpen(!menuOpen)}
                    className={cn.hamburgerButton}
                    id='Header_IHamburgerButton'
                />
                <label htmlFor='Header_IHamburgerButton'>
                    <div></div>
                </label>

                <div className={cn.menu}>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/'>Home</Link>
                            </li>
                            <li>
                                <Link to='/posters'>Posters</Link>
                            </li>
                            
                            {user && user.user_type === "buyer" && (
                                <>                                    
                                    <li>
                                        <Link to='/cart'>Cart</Link>
                                    </li>
                                    <li>
                                        <Link to='/orders'>Orders</Link>
                                    </li>
                                </>
                            )}

                            {user && user.user_type === "artist" && (
                                <>
                                <li>
                                    <Link to={`/profile/${user.username}`}>
                                        My Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/admires'>
                                        Admires
                                    </Link>
                                </li>
                                </>
                            )}
                        </ul>
                    </nav>

                    <div className={cn.buttons}>
                        {!user && (
                            <>
                                <LinkButton primary to='/register'>
                                    Register
                                </LinkButton>
                                <div className={cn.account}>
                                    <Link to='/login'>Sign In</Link>
                                </div>
                            </>
                        )}
                    
                        {user && user.user_type === "artist" && (
                            <>
                                <LinkButton primary to='/publish-poster'>
                                    Publish
                                </LinkButton>
                                <Link to={`/sales/${user.username}`}>
                                    Sales
                                </Link>
                            </>
                        )}

                        {user && (
                            <div className={cn.account}>
                                <Link to='/account'>Account</Link>
                                
                                <Link to='/' onClick={handleLogout}>
                                    Sign Out
                                </Link>
                            </div>
                        )}
                        
                    </div>
                </div>
            </div>
        </header>
    );
};
