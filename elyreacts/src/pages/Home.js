import React, { useEffect, useContext, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

import { PostersList } from "../components/PostersList";
import LinkButton from "../components/LinkButton";

// @ts-ignore
import cn from "./styles/Home.module.scss";

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
      {posters && <PostersList posters={posters.slice(0, 4)} />}

      <LinkButton href={`${linkName}`}>View {title}</LinkButton>
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
  const elHeroImage = useRef(null);

  useEffect(() => {
    getPosters("latest");
    getTopArtists();
    setHeroImage();
  }, []);

  const setHeroImage = (type = "") => {
    // Todo: load posters from getPosters("popular"), and choose one poster per category
    let bgImage = "";
    switch (type) {
      case "latest":
        bgImage = "https://source.unsplash.com/random/800x480";
        break;
      case "textography":
        bgImage = "https://source.unsplash.com/random/200x200";
        break;
      case "graphic-design":
        bgImage = "https://source.unsplash.com/random/800x600";
        break;
      case "photoshop":
        bgImage = "https://source.unsplash.com/random/940x640";
        break;
      default:
        bgImage = "https://source.unsplash.com/random/1280x720";
        break;
    }

    if (elHeroImage) {
      elHeroImage.current.style.backgroundImage = `url("${bgImage}")`;
    }
  };

  return (
    <div className={`page-container`}>
      <div className={cn.gridContainer}>
        <div className={`${cn.pageHeader} page-header`}>
          <h1 className={`page-title`}>Elywalls</h1>{" "}
          {/* todo: replace with logo (MAYBE) */}
          <p className={`page-preface`}>
            Elegant posters by independent artists
          </p>
        </div>

        <div className={cn.heroImage} ref={elHeroImage} />

        <div className={cn.sectionLinkContainer}>
          <ul className="style-none tiled-list">
            <li onMouseEnter={() => setHeroImage("latest")}>
              <Link to="latest">Latest</Link>
            </li>
            <li onMouseEnter={() => setHeroImage("textography")}>
              <Link to="/posters/textography">Textography</Link>
            </li>
            <li onMouseEnter={() => setHeroImage("graphic-design")}>
              <Link to="/posters/graphic-design">Graphic Design</Link>
            </li>
            <li onMouseEnter={() => setHeroImage("photoshop")}>
              <Link to="/posters/photoshop">Photoshop</Link>
            </li>
            <li onMouseEnter={() => setHeroImage("all")}>
              <Link to="/posters/all">All Posters</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={`lower-content-container`}>
        <div className={`hero-container`}>
          <img
            src="https://source.unsplash.com/random"
            alt="Random image (temporary)"
          />

          <div>
            <h2>Elegant Posters</h2>
            <p>By independent artists</p>

            <LinkButton primary to="/posters/all">
              View the Collection
            </LinkButton>
          </div>
        </div>

        <div className={`featured-container`}>
          {artists &&
            artists.map((artist) => (
              <a href={`/profile/${artist.username}`}>
                <span>{artist.name}</span>
                <small>@{artist.username}</small>
              </a>
            ))}
        </div>

        <FeaturedPostersList title="Latest" linkName="latest" />
        <FeaturedPostersList title="Photography" linkName="photography" />
        <FeaturedPostersList title="Textography" linkName="textography" />
        <FeaturedPostersList title="Graphic Design" linkName="graphic-design" />
        <FeaturedPostersList title="Photoshop" linkName="photoshop" />
      </div>
    </div>
  );
};
