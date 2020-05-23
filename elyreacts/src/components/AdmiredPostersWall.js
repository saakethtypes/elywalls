import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext, useState } from "react";
import { PostersList } from "../components/PostersList";

export const PostersAdmired = () => {
  let { posters, getAdmiredPosters } = useContext(GlobalContext);
  useEffect(() => {
    getAdmiredPosters();
  }, []);

  return (
    <div>
     <PostersList cat = 'Admired' posters = {posters}/>        
    </div>
  );
};
