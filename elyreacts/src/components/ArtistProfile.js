import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext, useState } from "react";
import { Poster } from "../components/Poster";

export const ArtistProfile = ({ auname }) => {
  let { artist, getArtist } = useContext(GlobalContext);
  useEffect(() => {
    getArtist(auname);
    //ex-lint-disable-next-line
  }, []);

  return (
    <div>
      <h1>{artist.name}</h1>
      <h2>{artist.username}</h2>
      <h2>{artist.admires} Admires</h2>
      {artist.postersmade.map((poster, index) => (
        <div>
          <Poster key={poster._id} index={index} poster={poster} />
        </div>
      ))}
    </div>
  );
};
