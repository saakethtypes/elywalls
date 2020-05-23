import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext, useState } from "react";
import { Poster } from "../components/Poster";

// @ts-ignore
import cn from './styles/PostersAll.module.scss';
import { PostersList } from "./PostersList";

export const PostersAll = () => {
  let { posters, getPostersAll } = useContext(GlobalContext);
  useEffect(() => {
    getPostersAll();
  }, []);

  return (
    <PostersList cat= 'All' posters = {posters}/>
  );
};
