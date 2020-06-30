import React from "react";
import { Link } from "react-router-dom";

// @ts-ignore
import cn from "./styles/Footer.module.scss";

export default () => {
    return (
        <footer className={cn.container}>
            <div className={cn.content}>
                <span>Elywalls</span>

                <ul className='regular'>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/posters'>Posters</Link>
                    </li>
                    <li>
                        <Link to='/orders'>Your Orders</Link>
                    </li>
                    <li>
                        <Link to='/account'>Your Account</Link>
                    </li>
                    <li>
                        <a href='mailto:elywalls@gmail.com'>Email Us</a>
                    </li>
                </ul>

                <span className={cn.copyright}>&copy; 2020 - Elywalls</span>
                <span className={cn.copying}>Copying user-uploaded content is prohibited</span>
            </div>
        </footer>
    );
};
