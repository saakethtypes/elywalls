import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext, useState } from "react";
import { Poster } from "../components/Poster";

import cn from './styles/Cart.module.scss';

export const PostersListCart = ({
  posters = []
}) => {
  const {
    removeFromCart
  } = useContext(GlobalContext);

  return (
    <ul className={`${cn.postersListContainer}`}>
      {posters.map((poster, index) =>
        <li key={index}>
          <Poster poster={poster} />
          <button className={cn.buttonRemove} onClick={() => removeFromCart(poster._id)}>
            Remove
          </button>
        </li>
      )}
    </ul>
  );
};

export const Cart = () => {
  const {
    user
  } = useContext(GlobalContext);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Cart</h1>
        <p>Posters you've added to your cart</p>
      </div>

      <div className="lower-content-container">
        <PostersListCart posters={user.cart} />
      </div>

      {/* todo: add checkout */}
    </div>
  );
};
