import React, { useEffect, useContext, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

import { PostersList } from "../components/PostersList";
import LinkButton from "../components/LinkButton";

// @ts-ignore
import cn from "./styles/Home.module.scss";
import { Poster } from "../components/Poster";

const FeaturedPostersList = ({ title, linkName }) => {
    const [posters, setPosters] = useState(null);
    const [err, setErr] = useState(null);

    const getPosters = async (category) => {
        return new Promise((resolve, reject) => {
            try {
                fetch(`/${category}`, {
                    method: "GET",
                })
                    .then((r) => r.json())
                    .then((data) => {
                        setPosters(data.posters);
                        resolve(data.posters);
                    });
            } catch (err) {
                setErr(err);
                reject(err);
            }
        });
    };

    useEffect(() => {
        getPosters(linkName);
    }, []);

    return (
        <div className={`collection-container`}>
            <h2>{title}</h2>
            <p>The latest from our {title} category</p>

            {err && <span>An error occurred</span>}
            {posters && (
                <div className={cn.postersContainer}>
                    {posters.slice(0, 3).map((poster, index) => (
                        <Poster key={index} poster={poster} />
                    ))}
                </div>
            )}

            <LinkButton href={`/posters/${linkName}`}>View {title}</LinkButton>
        </div>
    );
};

export const Home = () => {
    const {
        posters: { isLoading, error, posters },
        getPosters,
        getTopArtists,
        artists,
        user,
        getHeros,
        heros
    } = useContext(GlobalContext);

    // todo: Set full poster with info, instead of an image URL.
    // This way, info can be placed into the text on the image.
    const [heroImageUrl, setHeroImageUrl] = useState(`welcome`);

    useEffect(() => {
        // getPosters("latest");
        getTopArtists();
        setHeroImage();
        // getHeros()
    }, []);

    const setHeroImage = (type = "") => {
        // Todo: load posters from getPosters("popular"), and choose one poster per category
        switch (type) {
            case "latest":
                setHeroImageUrl(heros.heros[0]);
                break;
            case "textography":
                setHeroImageUrl(heros.heros[1]);
                break;
            case "graphic-design":
                setHeroImageUrl(heros.heros[2]);
                break;
            case "photoshop":
                setHeroImageUrl(heros.heros[3]);
                break;
            default:
                setHeroImageUrl(heros.heros[0]);
                break;
        }
    };
    const getDPUrl = (pictureUrl) => {
        try {
            return require("../assets/artistsDp/" + pictureUrl.split("Dp")[1].substring(1));
        } catch (err) {
            console.log(err)
            // todo/fixme: Remove this as it shouldn't be necessary outside of testing
            return "https://source.unsplash.com/random";
        }
    };

    const getPictureUrl = (pictureUrl) => {
        try {
            return require(`../assets/heros/${pictureUrl}.png`);
        } catch (err) {
            console.log(err)
            // fixme: Remove this as it shouldn't be necessary outside of testing
            return "https://source.unsplash.com/random";
        }
    };

    return (
        <div className={`page-container`}>
            <div className={cn.gridContainer}>
                <div className={`${cn.pageHeader} page-header`}>
                    <h1>Elywalls</h1>
                    <p>Elegant posters by independent artists</p>
                </div>

                <div className={cn.heroImageContainer}>
                    <Link to='/posters/all' className={cn.heroImage}>
                        <img src={getPictureUrl(heroImageUrl)} />
                    </Link>

                    <small className={cn.heroImageAuthor}>
                        <Link to='/posters/all'>Welcome Poster</Link> by{" "}
                        <Link to='/profile/test.artist'>Author Name</Link>
                    </small>
                </div>

                <div className={cn.sectionLinkContainer}>
                    <ul className='style-li-inline tiled-list'>
                        <li onMouseEnter={() => setHeroImage("photography")}>
                            <Link className='button grow-underline' to='/posters/photography'>
                                <span>Photography</span>
                            </Link>
                        </li>
                        <li onMouseEnter={() => setHeroImage("textography")}>
                            <Link className='button grow-underline' to='/posters/textography'>
                                <span>Textography</span>
                            </Link>
                        </li>
                        <li onMouseEnter={() => setHeroImage("graphic-design")}>
                            <Link className='button grow-underline' to='/posters/graphic-design'>
                                <span>Graphic Design</span>
                            </Link>
                        </li>
                        <li onMouseEnter={() => setHeroImage("photoshop")}>
                            <Link className='button grow-underline' to='/posters/photoshop'>
                                <span>Photoshop</span>
                            </Link>
                        </li>
                        <li onMouseEnter={() => setHeroImage("all")}>
                            <Link className='button grow-underline' to='/posters/all'>
                                <span>All Posters</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className='lower-content-container'>
                <div className='hero-container'>
                    <img src= {getPictureUrl('collection_thumb_home')} />

                    <div>
                        <h2>Elegant Posters</h2>
                        <p>By independent artists</p>

                        <LinkButton primary to='/posters/all'>
                            View the Collection
                        </LinkButton>
                    </div>
                </div>

                <section>
                    <h2>Featured Artists</h2>
                    <p>Featured Elywalls artists with top-selling content</p>

                    <ul>
                        {artists &&
                            artists.map((artist) => (
                                <li key={artist.username} className='featuredArtist'>
                                    <a href={`/profile/${artist.username}`}>
                                        {/* todo: Add profile pictures */}
                                        <img
                                            src={getDPUrl(artist.dpURL)}
                                            alt={artist.name}
                                        />
                                        <span>{artist.name}</span>
                                        <small>@{artist.username}</small>
                                    </a>
                                </li>
                            ))}
                    </ul>
                </section>

                <FeaturedPostersList title='Popular' linkName='popular' />
                <FeaturedPostersList title='Graphic Design' linkName='graphic-design' />
                <FeaturedPostersList title='Photoshop' linkName='photoshop' />
                <FeaturedPostersList title='Textography' linkName='textography' />
                <FeaturedPostersList title='Photography' linkName='photography' />
                <FeaturedPostersList title='Recent Posts' linkName='latest' />
            </div>
        </div>
    );
};
