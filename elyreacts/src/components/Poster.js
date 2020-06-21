import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

// @ts-ignore
import cn from './styles/Poster.module.scss';
import LinkButton from './LinkButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

export const Poster = ({
  poster,
  cat = '',
  className = ''
}) => {
  const {
    user,
    cart,
    log_status,
    admirePoster,
    unadmirePoster,
    addToCart,
    getCart,
    removeFromCart
  } = useContext(GlobalContext);

  const [isAdmired, setIsAdmired] = useState(
    user && user.admires.filter((ap) => ap._id === poster._id).length !== 0 || false
  );
  const [isAddedToCart, setIsAddedToCart] = useState(
    cart && cart.filter((ap) => ap.item._id === poster._id).length !== 0 || false
  );

  const [admires, setAdmires] = useState(poster.admires);
  let picUrl = null;
  let purl = poster.pictureURL.split('Db')[1];
  try {
    // Cross-platform solution
    picUrl = require("../assets/postersDb/" + purl.substring(1));
  } catch (err) {
    // todo/fixme: Remove this as it shouldn't be necessary outside of testing
    picUrl = 'https://source.unsplash.com/random';
  }

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
    let match = [];
    if (user)
      match = user && user.admires.filter((ap) => ap._id === poster._id);
    else
      console.warn("user is undefined");

    console.log(match.length);
    return match.length > 0;
  };

  const inCart = () => {
    console.log("2) checking in cart or not", cart);
    let match = [];
    if (user)
      match = cart && cart.filter((ap) => ap.item._id === poster._id);
    else
      console.warn("user is undefined");
    console.log(match);
    return match.length > 0;
  };

  const handleClickAdmire = (e) => {
    e.preventDefault()
    if (checkAdmires() != true) {
      console.log(`Like poster ${poster._id}`);
      admirePoster(poster);
      setIsAdmired(true);
      setAdmires(admires + 1);
      toast('🦄 Added to Admires', {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    } else {
      console.log(`Unlike poster ${poster._id}`);
      unadmirePoster(poster);
      setIsAdmired(false);
      setAdmires(admires - 1);
    }
  };

  const handleClickCart = (e) => {

    console.log("1) clicked add to cart");
    if (inCart() != true) {
      toast('🦄 Added to cart ', {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      addToCart(poster._id);
      setIsAddedToCart(true);
    } else {
      toast('🦄 In cart', {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      console.log("Already added to cart");
    }
  };

  const editPLink = `/edit-poster/${poster._id}`;

  return (
    <div className={`${className} ${cn.container}`}>
      <ToastContainer
position="bottom-right"
autoClose={1500}
hideProgressBar
newestOnTop
closeOnClick
rtl
pauseOnFocusLoss
draggable
pauseOnHover
/>
      <div className={`${cn.previewContainer}`}>
        <a href={`/poster/${poster.id}`}>
          <img src={picUrl} alt={poster.tags} />
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
            {cat == "postersMade" ?
              <LinkButton to={editPLink} >Edit</LinkButton>
              : null}
          </div>}
      </div>

      <div className={`${cn.caption}`}>
        <h3>{poster.title}</h3>
        <small><a href={`/profile/${poster.author}`}>{`By ${poster.author}`}</a></small>
        <div className={cn.admiresContainer}>
          <span className={cn.iconLikes}></span>
          <strong>{admires}</strong>
        </div>
        </div>
        </div>
    );
};

export const FakePoster = ({ className = "" }) => {
    return (
        <div className={`${className} ${cn.container}`}>
            <div className={cn.previewContainer}>
                <a href={`/all`}>
                    {/* // todo: make this a placeholder image, like a sad face or something */}
                    <img src={"https://source.unsplash.com/random/640x480"} alt={"Blank image"} />
                </a>
            </div>

            <div className={cn.caption}>
                <h3>Sorry!</h3>
                <small>No results found</small>
            </div>
        </div>
    );
};
