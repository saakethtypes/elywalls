import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext,useState } from "react";
import {Poster} from "../components/Poster";

export const Cart = () => {
  let { cart, getCart,removeFromCart } = useContext(GlobalContext);
  useEffect(() => {
    getCart();
  }, []);
  const remfromcart = (cid) => {
    removeFromCart(cid)
  }
    return (
      <div>
          <h1>Cart</h1>
        {cart.map((poster, index) => (
          <div key={poster.item._id}>
             < Poster key={poster.item._id} index={index} poster={poster.item} /> 
         <button onClick={(e)=>remfromcart(poster._id)}>Remove</button>
          </div>
        ))}         
      </div>
    )
}
