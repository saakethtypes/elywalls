import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext, useState } from "react";
import { Poster } from "../components/Poster";

export const ArtistProfile = () => {
  let { user, getProfileArtist } = useContext(GlobalContext);
  useEffect(() => {
    getProfileArtist();
  }, []);

  return (
    <div className="page-container">
      <h1>{user.name}</h1>
      <small>{user.username}</small>

      <h2>{user.admires} Admires</h2>
      <div className="lower-content-container">
        {user.postersmade.map((poster, index) => (
          <Poster key={poster._id} index={index} poster={poster} />
        ))}
      </div>
    </div>
  );
};
