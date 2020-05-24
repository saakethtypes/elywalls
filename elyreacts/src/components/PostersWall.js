import React, { useEffect, useContext, useState } from "react";
import { Link } from 'react-router-dom';
import { PostersList } from "../components/PostersList";
import { GlobalContext } from "../context/GlobalState";

// @ts-ignore
import cn from './styles/PostersWall.module.scss';

export const PostersWall = ({ category = 'featured' }) => {
  // let [isLoading, setIsLoading] = useState(false);
  // let [posters, setPosters] = useState([]);

  let { posters: postersAll, getPostersAll } = useContext(GlobalContext);
  let { posters: postersFeatured, getPostersFeatured } = useContext(GlobalContext);
  let { posters: postersPopular, getPostersPopular } = useContext(GlobalContext);
  let { posters: postersInstafamous, getPostersInstafamous } = useContext(GlobalContext);
  let { posters: admiredPosters, getAdmiredPosters } = useContext(GlobalContext);
  let { posters: postersTextography, getPostersTextography } = useContext(GlobalContext);
  let { posters: postersGraphic, getPostersGraphic } = useContext(GlobalContext);
  let { posters: postersPhotoshop, getPostersPhotoshop } = useContext(GlobalContext);
  let { posters: postersPhotography, getPostersPhotography } = useContext(GlobalContext);

  // todo/fixme(future): Use React Suspense instead of fetching async data inside useEffect
  useEffect(() => {
    switch (category) {
      case "all":
        getPostersAll();
      case "popular":
        getPostersPopular();
      case "instafamous":
        getPostersInstafamous();
      case "admired":
        getAdmiredPosters();
      case "textography":
        getPostersTextography();
      case "graphics":
        getPostersGraphic();
      case "photoshop":
        getPostersPhotoshop();
      case "photography":
        getPostersPhotography();
      case "featured":
        getPostersFeatured();
      default: // Show featured posters by default
        getPostersFeatured();
    }
  }, []);

  return (
    <div className="page-container">
      <h1>Posters</h1>
      <p>Category: {category}</p>

      <ul className={`style-none ${cn.categoryContainer}`}>
        <li><Link to="/posters/textography">Textography</Link></li>
        <li><Link to="/posters/textography">Textography</Link></li>
        <li><Link to="/posters/textography">Textography</Link></li>
        <li><Link to="/posters/textography">Textography</Link></li>
      </ul>

      {/* This is a horrible, horrible solution, but it seems to work.
        // todo: Refactor context to include postersLoading
        // ^ separate posters into its own piece of state
      */}

      <PostersList posters={
        postersAll ||
        postersFeatured ||
        postersPopular ||
        postersInstafamous ||
        admiredPosters ||
        postersTextography ||
        postersGraphic ||
        postersPhotoshop ||
        postersPhotography
      } />
    </div>
  );
};
