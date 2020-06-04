import React, { useState, useLayoutEffect } from 'react';
import { Poster, FakePoster } from "../components/Poster";
import Masonry from 'masonry-layout';

// @ts-ignore
import cn from './styles/PostersList.module.scss';

export const PostersList = ({ posters = [], className = '' }) => {
  const [scrollForever, setScrollForever] = useState(false);
  // todo: ^ set true when "Load more" button is clicked, then always load more at bottom of page

  // useLayoutEffect(() => {
  //   const masonryEl = document.getElementsByClassName(cn.postersListContainer)[0];

  //   const masonry = new Masonry(masonryEl, {
  //     itemSelector: `.${cn.posterContainer}`,
  //     columnWidth: `.${cn.gridElWidth}`
  //   });

  //   masonry.layout();
  // }, []);

  return (
    <div className={cn.postersListContainer}>
      <div className={cn.postersList}>
        {posters.length === 0 &&
          <FakePoster />}

        {posters.map((poster, index) =>
          <Poster poster={poster} />
        )}
      </div>
    </div>
  );
};