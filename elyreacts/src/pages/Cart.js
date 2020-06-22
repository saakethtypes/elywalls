import {GlobalContext} from "../context/GlobalState";
import React, {useEffect, useContext, useState} from "react";
import {CartItem} from '../components/CartItem';
import StripeCheckout from 'react-stripe-checkout';

// @ts-ignore
import cn from './styles/Cart.module.scss';

const dotenv = require('dotenv');
dotenv.config({path: "../../.env"});

export const Cart = () => {
  const {cart, getCart, pay} = useContext(GlobalContext);
  const toa = () => {
    let totall = 0;
    console.log(totall);
    cart.map((cart_item) => {
      console.log(cart_item);
      console.log(totall);
      // todo/fixme: price_with_quantity is undefined so this doesn't actually work
      console.log(totall, cart_item.price_with_quantity);
      totall += cart_item.price_with_quantity;
    });
    console.log("totall: ", totall);
    return totall;
  };
  const totall = toa();
  useEffect(() => {
    getCart();
    toa();
  }, []);

  const makePayment = (token) => {
    console.log(totall);
    const body = {
      token, totall
    };
    pay(body);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Cart</h1>
        <p>View your cart and continue to checkout</p>
      </div>

      <div className="lower-content-container">
        <div className={cn.cartItemsContainer}>
          {cart.map((cart_item, index) => (
            <CartItem
              ci={cart_item}
              className={cn.cartItem} />
          ))}
        </div>

        <div className={cn.checkoutContainer}>
          <h2>Checkout</h2>

          <p>Total: {totall} Rs</p>

          <StripeCheckout stripeKey={process.env.REACT_APP_KEY}
            token={makePayment}
            name="Pay with card"
            amount={totall}
            billingAddress
          >
            <button className="button-primary">Pay Now</button>
          </StripeCheckout>
        </div>
      </div>

      {/* todo: add checkout */}
    </div>
  );
};
