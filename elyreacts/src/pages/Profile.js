/*
    Profile.js

    Artist profile information
*/

import {GlobalContext} from "../context/GlobalState";
import React, {useEffect, useContext, useState, useLayoutEffect} from "react";
import {StripeCustomers} from '../components/StripeCustomers';

import {PostersList} from '../components/PostersList';
import LinkButton from '../components/LinkButton';
import {Link} from "react-router-dom";

export const Profile = ({
    artistId
}) => {
    let {
        artist,
        user,
        getArtist
    } = useContext(GlobalContext);
    useEffect(()=>{
        getArtist(artistId)
    },[])
    let ap = artist || null
    console.log(ap)

    if (!ap) return (<span>Loading...</span>); // todo: make this look nice

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>{ap.name}</h1>
                <p>@{ap.username}</p>
    <p>Posts {ap.postersmade.length} | {ap.profileViews} Views</p>
            </div>

                {ap.username!==user.username?<div className="special-link-container">
                        <Link to="/account/edit">
                            Report this user
                        </Link>
                    </div>:null}

                <div className="collection-container">
                    <h2>Published</h2>
                    <PostersList
                        posters={ap.postersmade} />
                </div>
            </div>
    );
};
   