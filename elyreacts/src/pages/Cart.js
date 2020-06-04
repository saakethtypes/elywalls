import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext,useState } from "react";
import {CartItem} from './CartItem';
import StripeCheckout from 'react-stripe-checkout';
const dotenv = require('dotenv')
dotenv.config({ path: "../../.env" });

export const Cart = () => {
  const { cart,getCart,pay } = useContext(GlobalContext);
  
  const toa = () =>{ 
    let totall = 0
    cart.map((cart_item) => (
    totall+=cart_item.price_with_quantity
  ))
  console.log(totall)
  return totall
}

  useEffect(()=>{
    getCart()

  },[])
  const totalPrice = toa()
  
  const makePayment = (token) => {
    console.log(totalPrice)
    const body ={ 
      token,totalPrice
    }
    pay(body)
  }

    return (
      <div>
          <h1>Cart</h1>
        {cart.map((cart_item, index) => (
          <div key={cart_item._id}>
             <CartItem ci={cart_item}/>
        <h3>price - {cart_item.price_with_quantity}</h3>
          </div>
        ))}
        <h2>Price total - {totalPrice}</h2>
        <StripeCheckout stripeKey = {process.env.REACT_APP_KEY} 
        token= {makePayment}
        name = "Pay with card"
        amount={totalPrice}
        billingAddress 
        >
        <button> Pay {totalPrice}</button>
        </StripeCheckout>
      </div>
    )
}
