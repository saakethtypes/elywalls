import React from 'react';
import { Poster } from "../components/Poster";

// @ts-ignore
import cn from './styles/PostersList.module.scss';


export const PostersList = ({ posters = [] }) => {
  return (
    <ul className={`${cn.postersListContainer}`}>
      {posters.map((poster, index) =>
        <li key={index}>
          <Poster poster={poster} />
        </li>
      )}
    </ul>
  );
};