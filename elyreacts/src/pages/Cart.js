import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext,useState } from "react";
import {Poster} from "../components/Poster";
import {CartItem} from './CartItem';

export const Cart = () => {
  let { cart,removeFromCart,getCart,submitCart } = useContext(GlobalContext);

  

  const [quantity, setquantity] = useState(1)

  useEffect(()=>{
    getCart()
  },[])

  const SubmitCart = () => {
    
  }

    return (
      <div>
          <h1>Cart</h1>
        {cart.map((cart_item, index) => (
          <div key={cart_item._id}>
             <CartItem ci={cart_item}/>
          </div>
        ))}
        <button onClick={SubmitCart}>Proceed to Buy</button>         
      </div>
    )
}
