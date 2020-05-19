import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext,useState } from "react";
import {Poster} from "../components/Poster";

export const Cart = () => {
    let {user} = useContext(GlobalContext)

    return (
      <div>
          <h1>Cart</h1>
        {user.cart.map((poster, index) => (
          <div>
             < Poster key={poster._id} index={index} poster={poster} /> 
          </div>
        ))}         
      </div>
    )
}
