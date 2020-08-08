import React from "react";
import { Link } from "react-router-dom";

//@ts-ignore
import ELYWALLS_LOGO from "../assets/images/Logo.svg";

// @ts-ignore
import cn from "./styles/Footer.module.scss";

export default () => {
    return (
        <footer className={cn.container}>
            <div className={cn.mainContent}>
                <div className={cn.logoContainer}>
                    <img src={ELYWALLS_LOGO} alt='Elywalls' />
                </div>

                <nav>
                    <h1>Popular Pages</h1>

                    <ul className='regular no-bullets'>
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
                </nav>

                <div>
                    <h1>Categories</h1>

                    <ul className='regular no-bullets'>
                        <li>
                            <Link to='/posters/all'>All Posters</Link>
                        </li>
                        <li>
                            <Link to='/posters/latest'>Latest</Link>
                        </li>
                        <li>
                            <Link to='/posters/photography'>Photography</Link>
                        </li>
                        <li>
                            <Link to='/posters/textography'>Textography</Link>
                        </li>
                        <li>
                            <Link to='/posters/graphic-design'>Graphic Design</Link>
                        </li>
                        <li>
                            <Link to='/posters/photoshop'>Photoshop</Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={cn.lowerContent}>
                <span className={cn.copyright}>&copy; 2020 - Elywalls</span>
                <small>
                    brought to life in India by {" "}
                    <a rel='noreferrer noopener' target='_blank' href='https://saakethtypes.github.io/'>
                        Saakethtypes - lead programmer
                    </a>
                </small>

                <small>
                    Designed in the UK by{" "}
                    <a rel='noreferrer noopener' target='_blank' href='https://samcross.digital/'>
                        Sam Cross Digital - designer
                    </a>
                </small>
                {/* <h2 className={cn.contactbuis}>Interested in taking up the buissiness? <a href = 'mailto:hello@elywalls.com'>@saaketh</a> 
                </h2> */}

                <small className={cn.copying}>
                    Unauthorised duplication of user-uploaded content is prohibited by law
                </small>
            </div>
        </footer>
    );
};
