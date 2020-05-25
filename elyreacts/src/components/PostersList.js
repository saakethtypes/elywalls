import React, { useState } from 'react';
import { Poster } from "../components/Poster";

// @ts-ignore
import cn from './styles/PostersList.module.scss';


export const PostersList = ({ posters = [], className = '' }) => {
  const [scrollForever, setScrollForever] = useState(false);
  // todo: ^ set true when "Load more" button is clicked, then always load more at bottom of page

  return (
    <ul className={`${className} ${cn.postersListContainer}`}>
      {posters.map((poster, index) =>
        <li key={index}>
          {/* todo: render fake poster if posters.length === 0 */}
          <Poster poster={poster} />
        </li>
      )}
    </ul>
  );
};