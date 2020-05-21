import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext, useState } from "react";
import { Poster } from "../components/Poster";

export const ArtistProfile = ({ auname }) => {
  let { artist, getArtist } = useContext(GlobalContext);
  useEffect(() => {
    getArtist(auname);
  }, []);

  return (
    <div className="page-container">
      <h1>{artist.name}</h1>
      <small>{artist.username}</small>

      <h2>{artist.admires} Admires</h2>
      <div className="lower-content-container">
        {artist.postersmade.map((poster, index) => (
          <Poster key={poster._id} index={index} poster={poster} />
        ))}
      </div>
    </div>
  );
};
