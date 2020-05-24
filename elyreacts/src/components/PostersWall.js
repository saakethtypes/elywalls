import React, { useEffect, useContext, useState } from "react";
import { Link } from 'react-router-dom';
import { PostersList } from "../components/PostersList";
import { GlobalContext } from "../context/GlobalState";

// @ts-ignore
import cn from './styles/PostersWall.module.scss';

export const PostersWall = ({ category = 'featured' }) => {
  let {
    posters: {
      isLoading,
      error,
      posters
    },
    getPosters
  } = useContext(GlobalContext);

  // todo/fixme(future): Use React Suspense instead of fetching async data inside useEffect
  useEffect(() => {
    getPosters(category);
  }, [category]);

  if (error) console.error(error);

  return (
    <div className="page-container">
      <h1>Posters</h1>
      <p>Category: {category}</p>

      <ul className={`style-none ${cn.categoryContainer}`}>
        <li><Link to="/posters/textography">Textography</Link></li>
        <li><Link to="/posters/graphics">Graphics</Link></li>
        <li><Link to="/posters/photoshop">Photoshop</Link></li>
        <li><Link to="/posters/photography">Photography</Link></li>
      </ul>

      {isLoading && <span>Loading...</span>}
      {!isLoading && error && <span>Error - see console</span>}
      {!isLoading && !error && <PostersList posters={posters} />}
    </div>
  );
};
