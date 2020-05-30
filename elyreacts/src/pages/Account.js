import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext, useState, useLayoutEffect } from "react";

import { PostersList } from '../components/PostersList';
import LinkButton from '../components/LinkButton';

export const Account = ({
    location
}) => {
    let { user, getProfileUser } = useContext(GlobalContext);

    useEffect(() => {
        getProfileUser();
    }, []);

    useLayoutEffect(() => {
        const sp = new URLSearchParams(location.search);
        const elPublished = document.getElementById('published');
        const elAdmired = document.getElementById('admired');

        if (sp.get('view') === "published" && elPublished) {
            // todo: scroll to elPublished
        }
        if (sp.get('view') === "admired" && elAdmired) {
            // todo: scroll to elAdmired
        }
    });

    if (!user) return (<span>Loading...</span>); // todo: make nice

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Account</h1>
                <p>{user.user_type === 'buyer' ? 'Likes' : 'Posts'} and account settings</p>
            </div>

            <div className="lower-content-container">
                <div className="information-container">
                    <p>User Type: {user.user_type}</p>
                    <p>Username: {user.username}</p>
                    <p>Full Name: {user.name}</p>
                    <p>Phone: {user.phone}</p>
                    <p>Email: {user.email}</p>

                    <LinkButton to="/account/edit">
                        Edit Details
                    </LinkButton>
                </div>

                {user.user_type === "buyer" && <div className="collection-container" id="admired">
                    <h2>Admires</h2>
                    <p>Your admired posters</p>
                    <PostersList
                        posters={user.admires} />
                </div>}
                {user.user_type === "artist" && <div className="collection-container" id="published">
                    <h2>Published</h2>
                    <p>Your published posters</p>
                    <PostersList
                        posters={user.postersmade} />
                </div>}
            </div>
        </div>
    );
};
