import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext, useState, useLayoutEffect } from "react";
import { StripeCustomers } from "../components/StripeCustomers";
import LoadingIcon from "../components/LoadingIcon";

import { PostersList } from "../components/PostersList";
import LinkButton from "../components/LinkButton";
import { Link } from "react-router-dom";

// @ts-ignore
import cn from "./styles/Profile.module.scss";

export const Profile = ({ artistId }) => {
    const getPictureUrl = (pictureUrl) => {
        try {
            return require("../assets/artistsDb/" + pictureUrl.split("Db")[1].substring(1));
        } catch (err) {
            // todo/fixme: Remove this as it shouldn't be necessary outside of testing
            return "https://source.unsplash.com/random";
        }
    };

    let { artist, user, getArtist } = useContext(GlobalContext);
    useEffect(() => {
        getArtist(artistId);
    }, []);
    let ap = artist || null;

    if (!ap) return <LoadingIcon />; // todo: make this look nice

    return (
        <div className='page-container'>
            <div className='page-header'>
                <img src={getPictureUrl(ap.dpURL)} alt={ap.name} />
                <h1>{ap.name}</h1>
                <p>@{ap.username}</p>
                <p>
                    Posts {ap.postersmade.length} | {ap.profileViews} Views
                </p>

                <div className='special-link-container'>
                    <Link to='/account/edit'>Report this user</Link>
                </div>

                <div className={cn.imageContainer}>
                    <img
                        src={"https://source.unsplash.com/random/480x480"}
                        alt={`${artist.name} on Elywalls`}
                    />
                </div>
            </div>

            <div className={`${cn.contentContainer} collection-container`}>
                <h2>Published</h2>
                <PostersList posters={artist.postersmade} />
            </div>
        </div>
    );
};
