import React from 'react'
import {Poster} from "../components/Poster";


// @ts-ignore
import cn from './styles/PostersAll.module.scss';


export const PostersList = ({posters,cat}) => {
    console.log(posters)
    return (
        <div className={`page-container ${cn.postersAllWrapper}`}>
          <h1 className="title">{cat} Posters</h1>
          <div className={`lower-content-container ${cn.postersAllContainer}`}>
            {posters.map((poster, index) => (
              <Poster
                key={poster._id}
                index={index}
                poster={poster} />
            ))}
          </div>
        </div>
      );
}




