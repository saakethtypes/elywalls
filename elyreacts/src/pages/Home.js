import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

import { PostersList } from "../components/PostersList";
import LinkButton from '../components/LinkButton';

// @ts-ignore
import cn from './styles/Home.module.scss';

/*
todo:
use different components to obtain different poster categories!
*/

const FeaturedPostersList = ({
  title,
  linkName
}) => {
  let {
    posters: {
      isLoading,
      error,
      posters
    },
    getPosters
  } = useContext(GlobalContext);

  useEffect(() => {
    getPosters(linkName);
  }, []);

  return (
    <div className={`collection-container`}>
      <h2>{title}</h2>
      <p>The latest from our {title} category</p>

      {isLoading && <span>Loading...</span>}
      {error && <span>An error occurred</span>}
      {posters && <PostersList posters={posters.slice(0, 4)} />}

      <LinkButton href={`/posters/${linkName}`}>
        View All
      </LinkButton>
    </div>
  );
};

export const Home = () => {
  let {
    posters: {
      isLoading,
      error,
      posters
    },
    getPosters
  } = useContext(GlobalContext);

  const [postersByCategory, setPostersByCategory] = useState([]);

  // const fetchPosters = async (category) => {
  //   const headers = new Headers({
  //     'Content-Type': 'application/json'
  //   });

  //   return fetch(`/${category}`, { headers })
  //     .then((res) => res.json());
  // };

  useEffect(() => {
    getPosters('featured');

    setHeroImage();
  }, []);

  const setHeroImage = (type = '') => {
    const heroImageElement = document.getElementById(cn.heroImage);

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

    if (heroImageElement) {
      heroImageElement.style.backgroundImage = mk(bgImage);
    }
  };

  return (
    <div className={`page-container`}>
      <div className={cn.gridContainer}>
        <div className={`${cn.pageHeader} page-header`}>
          <h1 className={`page-title`}>Elywalls</h1> { /* todo: replace with logo (MAYBE) */}
          <p className={`page-preface`}>Elegant posters by independent artists</p>
        </div>

        <div className={cn.heroImage} id={cn.heroImage}></div>

        <div className={cn.sectionLinkContainer}>
          <ul className="style-none tiled-list">
            <li onMouseEnter={() => setHeroImage('featured')}>
              <Link to="/posters">Featured</Link>
            </li>
            <li onMouseEnter={() => setHeroImage('textography')}>
              <Link to="/posters/textography">Textography</Link>
            </li>
            <li onMouseEnter={() => setHeroImage('graphic-design')}>
              <Link to="/posters/graphic-design">Graphic Design</Link>
            </li>
            <li onMouseEnter={() => setHeroImage('photoshop')}>
              <Link to="/posters/photoshop">Photoshop</Link>
            </li>
            <li onMouseEnter={() => setHeroImage('all')}>
              <Link to="/posters/all">All Posters</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={`lower-content-container`}>
        <FeaturedPostersList
          title="Photography"
          linkName="photography" />
        <FeaturedPostersList
          title="Textography"
          linkName="textography" />
        <FeaturedPostersList
          title="Graphic Design"
          linkName="graphic-design" />
        <FeaturedPostersList
          title="Photoshop"
          linkName="photoshop" />

        <div className={`hero-container`}>
          <img src="https://source.unsplash.com/random" alt="Random image (temporary)" />

          <div>
            <h2>Elegant Posters</h2>
            <p>By independent artists</p>

            <LinkButton
              primary
              to="/posters/all">
              View the Collection
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
};
