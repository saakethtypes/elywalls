import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext, useState } from "react";

export const Poster = ({ poster }) => {
  const { addToCart } = useContext(GlobalContext);
  return (
    <div>
      {poster.title}
      {poster.caption}
      <img src={poster.pictureURL} alt={poster.tags ? "exists aplt" : "tagss"} ></img>
      {poster.price}
      {/* <button>{poster.madeBy.username}</button> */}
      {poster.admires}
      {poster.views}
      <button onClick={addToCart}>add to cart</button>
      <button>buy</button>
    </div>
  );
};