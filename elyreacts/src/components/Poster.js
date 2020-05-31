import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext, useState } from "react";
// @ts-ignore
import cn from './styles/Poster.module.scss';

const ButtonAction = ({
  onClickHandler,
  activated = false,
  children
}) => {
  // todo: checkActiveFn is a function which checks the Active state of the button
  // eg: checkActiveFn could return true if Poster is Admired
  // this would then add the active class to the button
  return (
    <button
      className={`button-icon ${activated ? 'active' : ''}`}
      onClick={onClickHandler}>
      {children}
    </button>
  );
};

export const Poster = ({ poster }) => {
  const {
    user,
    log_status,
    admirePoster,
    unadmirePoster,
    addToCart
  } = useContext(GlobalContext);

  // The following booleans are only used for state updates in this component.
  // DO NOT use them to check the Admired/Cart status, use checkAdmires() and checkCart() instead.
  const [isAdmired, setIsAdmired] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [admires, setAdmires] = useState(poster.admires);
  var purl = String(poster.pictureURL)
  purl = purl.split('Db')
  purl = purl[1]
  console.log(purl)
  const picUrl = require('../assets/postersDb'+purl)
  // Sanitise poster data

  // todo: Verify data server-side (or at least earlier in the flow, than this component)
  poster = {
    ...poster,
    id: poster._id,
    title: poster.title || 'Untitled',
    author: poster.madeBy || 'Unknown',
    caption: poster.caption || 'Caption',
      //'https://source.unsplash.com/random',
    // which ever picture is not showing that is latest . to view that we need to use href = require(pictureURL)
    //therefore delting whole db with invalid poster paths
    // todo: //
    // Store the images somewhere else, then you should use the fully-qualified URL when fetching the images. eg:
    // images stored on Amazon S3 (or similar CDN)
    // -- pictureURL should point to the image's location on the CDN
    // -- alternatively, pictureURL could be a file blob, which is sent to the server as a request, and then the server sends the image data back
    price: poster.price || 0.0,
    views: poster.views || 0,
    admires: poster.admires || 0
  };
  

  const checkAdmires = () => {
    // Check the users' Admired posters
    let match = [];

    if (user)
      match = user.admires.filter((ap) => ap._id === poster._id);
    else
      console.warn("user is undefined");

    return match.length > 0;
  };

  const checkCart = () => {
    // Check the users' cart
    let match = [];

    if (user)
      match = user.cart.filter((ap) => ap.item._id === poster._id);
    else
      console.warn("user is undefined");

    return match.length > 0;
  };

  const handleClickAdmire = (e) => {
    if (!checkAdmires()) {
      // admirePoster(poster);
      setIsAdmired(true);
      setAdmires(admires + 1);
    } else {
      unadmirePoster(poster);
      setIsAdmired(false);
      setAdmires(admires - 1);
    }
  };

  const handleClickCart = (e) => {
    if (!checkCart()) {
      addToCart(poster);
      setIsAddedToCart(true);
    } else {
      // todo: Notify user - Already added to cart
      console.log("Already added to cart");
    }
  };

  return (
    <div className={`${cn.container}`}>
      <div className={`${cn.previewContainer}`}>
        <a href={`/poster/${poster.id}`}>
          <img src={picUrl} alt={poster.tags} />
          {/* TODO: Need to delete the posters database from mongo //  require(poster.pictureURL) */}
        </a>

        {log_status &&
          <div className={`${cn.buttons}`}>
            <ButtonAction
              onClickHandler={handleClickAdmire}
              activated={isAdmired}>
              ❤
          </ButtonAction>
            <ButtonAction
              onClickHandler={handleClickCart}
              activated={isAddedToCart}>
              +
          </ButtonAction>
          </div>}
      </div>

      <div className={`${cn.caption}`}>
        <h3>{poster.title}</h3>
        <small>{`By ${poster.author}`}</small>
        <div className={cn.admiresContainer}>
          <span>❤</span>
          <strong>{admires}</strong>
        </div>
        <strong className={cn.price}>{poster.price.toFixed(2)}</strong>
      </div>
    </div>
  );
};

export const FakePoster = () => {
  return (
    <div className={`${cn.container}`}>
      <div className={`${cn.previewContainer}`}>
        <a href={`/posters/all`}>
          {/* // todo: make this a placeholder image, like a sad face or something */}
          <img src={'https://source.unsplash.com/random/640x480'} alt={'Blank image'} />
        </a>
      </div>

      <div className={`${cn.caption}`}>
        <h2>Sorry!</h2>
        <small>No results found</small>
      </div>
    </div>
  );
};