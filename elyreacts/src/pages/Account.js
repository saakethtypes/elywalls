/*
    Account.js

    User account details, such as payment methods and email/username
*/

import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext, useState, useLayoutEffect } from "react";
import { StripeCustomers } from "../components/StripeCustomers";

import { PostersList } from "../components/PostersList";
import LoadingIcon from "../components/LoadingIcon";

export const Account = ({ location }) => {
    let { user, getProfileArtist } = useContext(GlobalContext);

    useEffect(() => {
        getProfileArtist();
    }, []);
    console.log(user);

    useLayoutEffect(() => {
        const sp = new URLSearchParams(location.search);
        const elPublished = document.getElementById("published");
        const elAdmired = document.getElementById("admired");

        if (sp.get("view") === "published" && elPublished) {
            // todo: scroll to elPublished
        }
        if (sp.get("view") === "admired" && elAdmired) {
            // todo: scroll to elAdmired
        }
    });

    if (!user) return <LoadingIcon />;

    return (
        <div className='page-container'>
            <div className='page-header'>
                <h1>Account</h1>
                <p>{user.user_type === "buyer" ? "Likes" : "Posts"} and account settings</p>
            </div>

            <div className='lower-content-container'>
                <div className='information-container'>
                    <div className='information-grid'>
                        <span>Username</span> <span>{user.username}</span>
                        <span>Full Name</span> <span>{user.name}</span>
                        <span>Phone</span> <span>{user.phone}</span>
                        <span>Email</span> <span>{user.email}</span>
                        {user.linkedIG && user.linkedIG !== "" && (
                            <>
                                <span>Instagram</span>
                                <span>
                                    <a href={`https://www.instagram.com/${user.linkedIG}`}>
                                        {user.linkedIG}
                                    </a>
                                </span>
                            </>
                        )}
                    </div>

                    <div className='buttons-container'>
                        <StripeCustomers />
                    </div>
                </div>

                {user.user_type === "buyer" && (
                    <div className='collection-container' id='admired'>
                        <h2>Admires</h2>
                        <p>Your admired posters</p>
                        <PostersList posters={user.admires} />
                    </div>
                )}
                {user.user_type === "artist" && (
                    <div className='collection-container' id='published'>
                        <h2>Published</h2>
                        <p>Your published posters</p>
                        <PostersList posters={user.postersmade} cat='postersMade' />
                    </div>
                )}
            </div>
        </div>
    );
};
