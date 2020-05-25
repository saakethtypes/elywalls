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
    <div className={`page-container`}>
      <div className={`page-header`}>
        <h1 className="page-title">Posters</h1>
        <p className="page-preface">{category}</p>
      </div>

      <div className="lower-content-container">
        <div className={`tiled-list-container ${cn.categoryWrapper}`}>
          <span>Category</span>

          <ul className={`style-none tiled-list ${cn.categoryContainer}`}>
            <li className={category === 'featured' ? "active" : ''}><Link to="/posters/featured">Featured</Link></li>
            <li className={category === 'popular' ? "active" : ''}><Link to="/posters/popular">Popular</Link></li>
            <li className={category === 'graphic-design' ? "active" : ''}><Link to="/posters/graphic-design">Graphic Design</Link></li>
            <li className={category === 'textography' ? "active" : ''}><Link to="/posters/textography">Textography</Link></li>
            <li className={category === 'photoshop' ? "active" : ''}><Link to="/posters/photoshop">Photoshop</Link></li>
            <li className={category === 'photography' ? "active" : ''}><Link to="/posters/photography">Photography</Link></li>
            <li className={category === 'instafamous' ? "active" : ''}><Link to="/posters/instafamous">Insta-famous</Link></li>
            <li className={category === 'all' ? "active" : ''}><Link to="/posters/all">All</Link></li>
          </ul>
        </div>

        {isLoading && <span>Loading...</span>}
        {!isLoading && error && <span>Error - see console</span>}
        {!isLoading && !error && <PostersList className={cn.postersList} posters={posters} />}
      </div>
    </div>
  );
};
