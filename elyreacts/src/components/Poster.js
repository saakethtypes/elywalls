import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext, useState } from "react";

// @ts-ignore
import cn from './styles/Poster.module.scss';

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
    <div className={`${cn.posterContainer}`}>
      <div className={`${cn.posterPreview}`}>
        <a href={poster.permalink || '/poster/xyz'} className={`${cn.posterLink}`}>
          {/* // ! Temporarily replace poster.pictureURL with a random Unsplash image -- every time */}
          {/* <img src={poster.pictureURL} alt={poster.title ? poster.title : "Poster"} /> */}
          <img src={`https://source.unsplash.com/random`} alt="From Unsplash" />
        </a>

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
    </div>
  );
};