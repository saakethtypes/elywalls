import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

import { PostersList } from "../components/PostersList";
import LinkButton from '../components/LinkButton';

// @ts-ignore
import cn from './styles/Home.module.scss';

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

    const categories = [
      "featured",
      "textography",
      "graphic-design",
      "photoshop",
      "photography"
    ];

    // categories.forEach(async (cat) => {
    //   const _res = await fetchPosters(cat);

    //   setPostersByCategory([
    //     ...postersByCategory,
    //     {
    //       category,
    //       posters: _res.data.posters
    //     }
    //   ]);
    // });

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
              <Link to="/posters">Featured</Link></li>
            <li onMouseEnter={() => setHeroImage('textography')}>
              <Link to="/posters/textography">Textography</Link></li>
            <li onMouseEnter={() => setHeroImage('graphic-design')}>
              <Link to="/posters/graphic-design">Graphic Design</Link></li>
            <li onMouseEnter={() => setHeroImage('photoshop')}>
              <Link to="/posters/photoshop">Photoshop</Link></li>
            <li onMouseEnter={() => setHeroImage('all')}>
              <Link to="/posters/all">All Posters</Link></li>
          </ul>
        </div>
      </div>

      <div className={`lower-content-container`}>
        <div className={`collection-container`}>
          <h2>Featured</h2>
          <p>A curated selection of our favourites</p>

          {posters && <PostersList posters={posters.slice(0, 4)} />}

          <LinkButton href="/posters/featured">
            View All
          </LinkButton>
        </div>

        <div className={`collection-container`}>
          <h2>Textography</h2>
          <p>The latest from our Textography category</p>

          {posters && <PostersList posters={posters.slice(0, 4)} />}

          <LinkButton href="/posters/textography">
            View All
          </LinkButton>
        </div>

        <div className={`collection-container`}>
          <h2>Graphic Design</h2>
          <p>The latest from our Graphic Design category</p>

          {posters && <PostersList posters={posters.slice(0, 4)} />}

          <LinkButton href="/posters/graphic-design">
            View All
          </LinkButton>
        </div>

        <div className={`collection-container`}>
          <h2>Photoshop</h2>
          <p>The latest from our Photoshop category</p>

          {posters && <PostersList posters={posters.slice(0, 4)} />}

          <LinkButton href="/posters/photoshop">
            View All
          </LinkButton>
        </div>

        <div className={`hero-container`}>
          <h2>Elegant Posters</h2>
          <p>By independent artists</p>
        </div>
      </div>
    </div>
  );
};
