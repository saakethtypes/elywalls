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
                console.log(category);
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
                console.log(err.message);
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
    } = useContext(GlobalContext);

    // todo: Set full poster with info, instead of an image URL.
    // This way, info can be placed into the text on the image.
    const [heroImageUrl, setHeroImageUrl] = useState("https://source.unsplash.com/random/400x600");

    useEffect(() => {
        // getPosters("latest");
        getTopArtists();
        setHeroImage();
    }, []);

    const setHeroImage = (type = "") => {
        // Todo: load posters from getPosters("popular"), and choose one poster per category
        switch (type) {
            case "latest":
                setHeroImageUrl("https://source.unsplash.com/random/401x600");
                break;
            case "textography":
                setHeroImageUrl("https://source.unsplash.com/random/402x600");
                break;
            case "graphic-design":
                setHeroImageUrl("https://source.unsplash.com/random/403x600");
                break;
            case "photoshop":
                setHeroImageUrl("https://source.unsplash.com/random/404x600");
                break;
            default:
                setHeroImageUrl("https://source.unsplash.com/random/405x600");
                break;
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
                        <img src={heroImageUrl} />
                    </Link>

                    <small className={cn.heroImageAuthor}>
                        <Link to='/posters/all'>Welcome Poster</Link> by{" "}
                        <Link to='/profile/test.artist'>Author Name</Link>
                    </small>
                </div>

                <div className={cn.sectionLinkContainer}>
                    <ul className='style-none tiled-list'>
                        <li onMouseEnter={() => setHeroImage("latest")}>
                            <Link className='button grow-underline' to='latest'>
                                <span>Latest</span>
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
                    <img src='https://source.unsplash.com/random' alt='Random image (temporary)' />

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
                                            src={"https://source.unsplash.com/random/600x600"}
                                            alt={artist.name}
                                        />
                                        <span>{artist.name}</span>
                                        <small>@{artist.username}</small>
                                    </a>
                                </li>
                            ))}
                    </ul>
                </section>

                <FeaturedPostersList title='Latest' linkName='latest' />
                <FeaturedPostersList title='Photography' linkName='photography' />
                <FeaturedPostersList title='Textography' linkName='textography' />
                <FeaturedPostersList title='Graphic Design' linkName='graphic-design' />
                <FeaturedPostersList title='Photoshop' linkName='photoshop' />
            </div>
        </div>
    );
};
