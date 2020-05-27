import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext, useState } from "react";
import { Poster } from "../components/Poster";
import { PostersList } from "./PostersList";

//@ts-ignore
import cn from './styles/Admired.module.scss';

export const Admired = () => {
  let { user } = useContext(GlobalContext);
  return (
    <div className={`page-container`}>
      <div className={`page-header`}>
        <h1 className="page-title">Admires</h1>
        <p className="page-preface">{user.name}'s Admires</p>
      </div>

      <PostersList
        className={cn.postersList}
        posters={user.admires} />
    </div>
  );
};
