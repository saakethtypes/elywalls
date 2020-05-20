import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

export const Home = () => {

  const history = useHistory();


  const routeLogin = () => {
    let path = `/login`;
    history.push(path);
  };

  const routeRu = () => {
    let path = `/register`;
    history.push(path);
  };
  const routeRa = () => {
    let path = `/register-artist`;
    history.push(path);
  };
  const routeT = () => {
    let path = `/textography`;
    history.push(path);
  };
  const routeG = () => {
    let path = `/graphic-design`;
    history.push(path);
  };
  const routePs = () => {
    let path = `/photoshop`;
    history.push(path);
  };
  const routePh = () => {
    let path = `/photography`;
    history.push(path);
  };
  const routeA = () => {
    let path = `/all`;
    history.push(path);
  };

  //TODO show top 5 featured,popular,instafamous section of print ig wall

  return (
    <div className={`page-container`}>
      <h3>Home</h3>
      <h2>Elegant posters for your walls</h2>
      <br></br>
      <button onClick={routeT}>Textography</button>
      <button onClick={routeG}>Graphic-design</button>
      <button onClick={routePh}>Photography</button>
      <button onClick={routePs}>Aesthethic edits</button>
      <button onClick={routeA}>All posters</button>

    </div>
  );
};
