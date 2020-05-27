import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext, useState } from "react";

// @ts-ignore
import cn from './styles/Poster.module.scss';

const ButtonAction = ({ callback, checkActiveFn, children }) => {
  // todo: checkActiveFn is a function which checks the Active state of the button
  // eg: checkActiveFn could return true if Poster is Admired
  // this would then add the active class to the button

  const isActive = () => (checkActiveFn ? 'active' : '');

  return (
    <button
      className={`button-icon ${isActive}`}
      onClick={callback}>
      {children}
    </button>
  );
};

export const Poster = ({ poster }) => {
  const { user, log_status, admirePoster, unadmirePoster, addToCart } = useContext(GlobalContext);

  const [admired, setAdmired] = useState(false);

  const handleAddToCart = () => addToCart(poster._id);
  const handleAdmire = () => console.log("Admired: " + poster._id);

  // todo: Verify data server-side (or at least earlier in the flow, than this component)
  poster = {
    ...poster,
    id: poster._id,
    title: poster.title || 'Untitled',
    author: poster.madeBy || 'Unknown',
    caption: poster.caption || 'Caption',
    pictureURL:
      poster.pictureURL ?
        (poster.pictureURL.length > 55 ? poster.pictureURL : null) :
        'https://source.unsplash.com/random',
    // which ever picture is not showing that is latest . to view that we need to use href = require(pictureURL)
    //therefore delting whole db with invalid poster paths
    price: poster.price || 0.0,
    views: poster.views || 0,
    admires: poster.admires || 0
  };

  const checkLike = () => {
    if (user) {
      user.admires.map((admiredPoster) => {
        if (admiredPoster._id == poster._id) {
          setAdmired(true);
        } else {
          setAdmired(false);
        }
      });
    }
  };

  useEffect(() => {
    checkLike();
  }, []);


  const [admires, setadmires] = useState(poster.admires);
  const addtocart = (e) => {
    e.preventDefault();
    // todo: reimplement with includes (or contains, don't remember which it is)
    user.cart.map((ucart) => {
      if (ucart.item._id === poster._id) {
        console.log("cart inded");
      } else {
        addToCart(poster);
      }
    });
    if (user.cart.length === 0) {
      addToCart(poster);
    }
  };

  // todo: Why are these here??
  // const admirposter = (e) => {
  //   e.preventDefault();
  //   setadmires(admires + 1);
  //   setAdmired(true);
  //   admirePoster(poster);
  // };
  // const unadmirposter = (e) => {
  //   e.preventDefault();
  //   setadmires(admires - 1);
  //   setAdmired(false);
  //   unadmirePoster(poster._id);
  // };

  return (
    <div className={`${cn.container}`}>
      <div className={`${cn.previewContainer}`}>
        <a href={`/poster/${poster.id}`}>
          <img src={poster.pictureURL} alt={poster.title ? poster.title : "Untitled Poster"} />
          {/* TODO: Need to delete the posters database from mongo //  require(poster.pictureURL) */}
        </a>

        {log_status &&
          <div className={`${cn.buttons}`}>
            <ButtonAction
              callback={handleAdmire}
              checkActiveFn={() => admired}>
              ❤
          </ButtonAction>
            <ButtonAction
              callback={handleAddToCart}
              checkActiveFn={() => false}>
              +
          </ButtonAction>
          </div>}
      </div>

      <div className={`${cn.caption}`}>
        <h2>{poster.title}</h2>
        <small>{`By ${poster.author}`}</small>
        {/*<strong>{admires}</strong>*/}
        <strong className={`${cn.price}`}>{poster.price.toFixed(2)}</strong>
      </div>
    </div>
  );
};

export const FakePoster = ({ }) => {
  return (
    <div className={`${cn.container}`}>
      <div className={`${cn.previewContainer}`}>
        <a href={`/posters/all`}>
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