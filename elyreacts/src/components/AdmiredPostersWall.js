import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext, useState } from "react";
import { Poster } from "../components/Poster";

export const PostersAdmired = () => {
  let { posters, getAdmiredPosters } = useContext(GlobalContext);
  useEffect(() => {
    getAdmiredPosters();
    //ex-lint-disable-next-line
  }, []);

  return (
    <div>
      <h1>Admired Posters</h1>
      {posters.map((poster, index) => (
        <div>
          <Poster key={poster._id} index={index} poster={poster} />
        </div>
      ))}
    </div>
  );
};
