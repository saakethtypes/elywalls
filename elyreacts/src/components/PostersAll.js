import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext, useState } from "react";
import { Poster } from "../components/Poster";

// @ts-ignore
import cn from './styles/PostersAll.module.scss';

export const PostersAll = () => {
  let { posters, getPostersAll } = useContext(GlobalContext);
  useEffect(() => {
    getPostersAll();
  }, []);

  return (
    <div className={`page-container ${cn.postersAllWrapper}`}>
      <h1 className="title">All Posters</h1>
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
};
