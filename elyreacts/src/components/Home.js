import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { PostersList } from "./PostersList";
import { GlobalContext } from "../context/GlobalState";

// @ts-ignore
import cn from './styles/Home.module.scss';

export const Home = () => {
  let {
    posters: {
      isLoading,
      error,
      posters
    },
    getPosters,
  } = useContext(GlobalContext);
  

  //TODO show top 5 featured,popular,instafamous section of print ig wall
  useEffect(() => {
    getPosters('featured');
    setBannerImage();

  }, []);

  const setBannerImage = (type = '') => {
    const bannerImageElement = document.getElementById(cn.bannerImage);

    const mk = (u) => `url("${u}")`;

    let bgImage = '';

    // Todo: load images from a new getTopPoster(category) method in global state

    switch (type) {
      case 'featured':
        bgImage = 'https://source.unsplash.com/random/800x480';
        break;
      case 'textography':
        bgImage = 'https://source.unsplash.com/random/200x200';
        break;
      case 'graphic-design':
        bgImage = 'https://source.unsplash.com/random/800x600';
        break;
      case 'photoshop':
        bgImage = 'https://source.unsplash.com/random/940x640';
        break;
      default:
        bgImage = 'https://source.unsplash.com/random/1280x720';
        break;
    }

    if (bannerImageElement) {
      bannerImageElement.style.backgroundImage = mk(bgImage);
    }
  };

  return (
    <div className={`page-container`}>
      <div className={`page-header`}>
        <h1 className={`page-title`}>Home</h1>
        <p>Elegant posters for your walls</p>
      </div>

      <div className="lower-content-container">
        <div className={cn.banner}>
          <div className={cn.bannerImage} id={cn.bannerImage}></div>

          <div className={cn.bannerLinkContainer}>
            <ul className="style-none tiled-list">
              <li onMouseEnter={() => setBannerImage('featured')}>
                <Link to="/posters">Featured</Link></li>
              <li onMouseEnter={() => setBannerImage('textography')}>
                <Link to="/posters/textography">Textography</Link></li>
              <li onMouseEnter={() => setBannerImage('graphic-design')}>
                <Link to="/posters/graphic-design">Graphic Design</Link></li>
              <li onMouseEnter={() => setBannerImage('photoshop')}>
                <Link to="/posters/photoshop">Photoshop</Link></li>
              <li onMouseEnter={() => setBannerImage('all')}>
                <Link to="/posters/all">All Posters</Link></li>
            </ul>
          </div>
        </div>

        <PostersList posters={posters} />
      </div>
    </div>
  );
};
