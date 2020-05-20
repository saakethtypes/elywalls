import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext, useState } from "react";

import cn from './Poster.module.scss';

export const Poster = ({ poster, large = false }) => {
  const { addToCart } = useContext(GlobalContext);

  poster = {
    title: "Poster Title",
    views: 12,
    admires: 4,
    price: 14.5,
    caption: "A poster by Author, costing $14.50",
    author: "Erra"
  };

  return (
    <a href={poster.permalink || `/poster/${poster.author}/${poster.title}`} className={`${cn.posterContainer}`}>
      <div className={`${cn.posterPreview}`}>
        {/* // todo: Temporarily replace poster.pictureURL with a random Unsplash image -- every time
        <img src={poster.pictureURL} alt={poster.title ? poster.title : "Poster"} /> */}
        <img src={`https://source.unsplash.com/random`} alt="From Unsplash" />

        <div className={`${cn.posterCTA}`}>
          <button className="button-primary">Buy Now</button>
          <button className="button-secondary" onClick={addToCart}>Add to Cart</button>
        </div>
      </div>

      <div className={`${cn.posterInfoContainer}`}>
        <div className={`${cn.simple}`}>
          <h2>{poster.title || 'Untitled'}</h2>
          <small>{`By ${poster.author || 'authorusername'}`}</small>

          <strong className={`${cn.price}`}>{poster.price.toFixed(2) || '0.00'}</strong>
        </div>

        <div className={`${cn.extended} ${large ? '' : cn.extended_hidden}`}>
          <p>{poster.caption || `This is a poster by ${poster.author || 'authorusername'}, costing ${poster.price || '$0.00'}.`}</p>
          <div className={`${cn.stats}`}>
            <span className={`${cn.stats__views}`}>{poster.views}</span>
            <span className={`${cn.stats__admires}`}>{poster.admires}</span>
          </div>
        </div>
      </div>
    </a>
  );
};