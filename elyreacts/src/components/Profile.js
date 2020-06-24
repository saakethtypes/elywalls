import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext, useState, useLayoutEffect } from "react";
import { StripeCustomers } from "../components/StripeCustomers";
import LoadingIcon from "../components/LoadingIcon";

import { PostersList } from "../components/PostersList";
import LinkButton from "../components/LinkButton";
import { Link } from "react-router-dom";

// @ts-ignore
import cn from "./styles/Profile.module.scss";

const getPictureUrl = (pictureUrl) => {
    try {
        console.log("...",pictureUrl)
        return require("../assets/artistsDp/" + pictureUrl.split("Dp")[1].substring(1));
    } catch (err) {
        // todo/fixme: Remove this as it shouldn't be necessary outside of testing
        return "https://source.unsplash.com/random";
    }
};

export const Profile = ({ artistId }) => {
    let { artist, user, getArtist } = useContext(GlobalContext);
    useEffect(() => {
        getArtist(artistId);
    }, []);

    if (!artist) return <LoadingIcon />; // todo: make this look nice

    return (
        <div className='page-container'>
            <div className={cn.pageHeader}>
                <h1>{artist.name}</h1>
                <p>{`@${artist.username}`}</p>

                {user && artist.username !== user.username && (
                    <div className={cn.reportButtonContainer}>
                        <small>
                            <Link to='/account/edit'>Report User</Link>
                        </small>
                    </div>
                )}

                <div className={cn.statsContainer}>
                    <div>
                        <span>{artist.postersmade.length}</span>
                        <span>Posts</span>
                    </div>
                    <div>
                        <span>{artist.profileViews}</span>
                        <span>Views</span>
                    </div>
                </div>

                <div className={cn.imageContainer}>
                    <img src={getPictureUrl(artist.dpURL)} alt={`${artist.name} on Elywalls`} />
                </div>
            </div>

            <div className={`${cn.contentContainer} collection-container`}>
                <h2>Published</h2>
                <PostersList posters={artist.postersmade} />
            </div>
        </div>
    );
};
