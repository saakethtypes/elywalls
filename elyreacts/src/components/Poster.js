import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext, useState } from "react";

// @ts-ignore
import cn from './styles/Poster.module.scss';

const ButtonAction = ({
  onClickHandler,
  activated,
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

  // DO NOT check admired/cart status with these values directly.
  // checkCart/checkAdmired will use the current user values eventually.
  const [isAdmired, setIsAdmired] = useState(
    // If user.admires contains this poster, isAdmired will be true
    user.admires.filter((ap) => ap._id === poster._id).length !== 0
  );
  const [isAddedToCart, setIsAddedToCart] = useState(
    // If user.cart contains this poster, isAddedToCart will be true
    user.cart.filter((ap) => ap.item._id === poster._id).length !== 0
  );
  const [admires, setAdmires] = useState(poster.admires);

  let picUrl = null;
  let purl = poster.pictureURL.split('Db')[1];
  try {
    picUrl = require("../assets/postersDb" + purl);
  } catch (err) {
    // todo: TEMPORARILY WHILE I DON'T HAVE THE PICTURES LOCALLY
    // This MUST be removed in production
    picUrl = 'https://source.unsplash.com/random';
  }

  // todo: Verify data server-side (or at least earlier in the flow, than this component)
  poster = {
    ...poster,
    id: poster._id,
    title: poster.title || 'Untitled',
    author: poster.madeBy || 'Unknown',
    caption: poster.caption || 'Caption',
    price: poster.price || 0.0,
    views: poster.views || 0,
    admires: poster.admires || 0
  };


  const checkAdmires = () => {
    // Check the users' Admired posters
    // todo/fixme: This doesn't work because user is never updated.
    // todo/fixme: Using this component's state to check admires for the time being
    // let match = [];

    // if (user)
    //   match = user.admires.filter((ap) => ap._id === poster._id);
    // else
    //   console.warn("user is undefined");

    // console.log(match.length);
    // return match.length > 0;

    return isAdmired;
  };

  const checkCart = () => {
    // Check the users' cart
    // todo/fixme: This doesn't work because user is never updated.
    // todo/fixme: Using this component's state to check cart for the time being
    // let match = [];

    // if (user)
    //   match = user.cart.filter((ap) => ap.item._id === poster._id);
    // else
    //   console.warn("user is undefined");

    // return match.length > 0;

    return isAddedToCart;
  };

  const handleClickAdmire = (e) => {
    if (!checkAdmires()) {
      console.log(`Like poster ${poster._id}`);
      admirePoster(poster);
      setIsAdmired(true);
      setAdmires(admires + 1);
    } else {
      console.log(`Unlike poster ${poster._id}`);
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
          <img src={picUrl} alt={poster.title} />
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