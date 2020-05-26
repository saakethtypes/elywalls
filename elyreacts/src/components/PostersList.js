import React, { useState } from 'react';
import { Poster, FakePoster } from "../components/Poster";

// @ts-ignore
import cn from './styles/PostersList.module.scss';


export const PostersList = ({ posters = [], className = '' }) => {
  const [scrollForever, setScrollForever] = useState(false);
  // todo: ^ set true when "Load more" button is clicked, then always load more at bottom of page

  return (
    <ul className={`${className} ${cn.postersListContainer}`}>
      {posters.length === 0 &&
        <FakePoster />}

      {posters.map((poster, index) =>
        <li key={index}>
          <Poster poster={poster} />
        </li>
      )}
    </ul>
  );
};