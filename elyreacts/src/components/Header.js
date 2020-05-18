import React from 'react';

// @ts-ignore
import INDYWALLS_LOGO from '../assets/images/Logo.svg';

import cn from './Header.module.scss';

export default () => {
    return (
        <header className={cn.headerWrapper}>
            <div className={cn.headerContainer}>
                <img src={INDYWALLS_LOGO} alt="INDYWALLS" />

                <div className={cn.headerMenuIcon}>
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
                            <a href="/register?as=buyer" className={`link-button ${cn.accountRegisterButton__buyerButton}`}>
                                Register
                            </a>

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
