import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext, useState, useLayoutEffect } from "react";
import { StripeCustomers } from "../components/StripeCustomers";
import LoadingIcon from "../components/LoadingIcon";

import { PostersList } from "../components/PostersList";
import { Link } from "react-router-dom";

// @ts-ignore
import ICON_INSTAGRAM from "../assets/images/Instagram-Mark.svg";

// @ts-ignore
import cn from "./styles/Profile.module.scss";

const getPictureUrl = (pictureUrl) => {
    try {
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

                {user && artist.username == user.username && (
                    <div className={cn.reportButtonContainer}>
                        <h3>
                            <Link to={`/account/edit/${artist._id}`}>Edit</Link>
                        </h3>
                    </div>
                )}
                {user && artist.username ==! user.username && (
                    <div className={cn.reportButtonContainer}>
                        <small>
                            <a href='mailto:elywalls@gmail.com'>Report User</a>
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

                <a className={cn.instagramContainer} href={`https://www.instagram.com/${artist.linkedIG}`}>
                    <img src={ICON_INSTAGRAM} alt='Instagram'  />
                </a>
                <div className={cn.imageContainer}>
                    <img src={getPictureUrl(artist.dpURL)} alt={`${artist.name} on Elywalls`} />
                </div>
            </div>

            <div className={`${cn.contentContainer} collection-container`}>
            <h3 className={cn.caption}>{artist.quote}</h3>

                <h2>Published</h2>
                <PostersList posters={artist.postersmade} />
            </div>
        </div>
    );
};
