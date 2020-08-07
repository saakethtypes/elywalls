import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext, useState } from "react";
import { CartItem } from "../components/CartItem";
import StripeCheckout from "react-stripe-checkout";
import LoadingIcon from "../components/LoadingIcon";

// @ts-ignore
import cn from "./styles/Cart.module.scss";

const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });

export const Cart = (props) => {
    const { cart, getCart, pay , user} = useContext(GlobalContext);
    const toa = () => {
        let totall = 0;
        cart.map((cart_item) => {
            // todo/fixme: price_with_quantity is undefined so this doesn't actually work
            totall += cart_item.price_with_quantity;
        });
        return totall;
    };
    const totall = toa();
    useEffect(() => {
        getCart();
        toa();
    }, []);

    const makePayment = (token) => {
        const body = {
            token,
            totalPrice: totall,
            email:user.email
        };
        pay(body, props);
    };

    if (!cart) return <LoadingIcon />;

    return (
        <div className='page-container'>
            <div className='page-header'>
                <h1>Cart</h1>
                <p>View your cart and continue to checkout</p>
            </div>

            <div className='lower-content-container'>
                <div className={cn.cartItemsContainer}>
                    {cart.map((cart_item, index) => (
                        <CartItem key = {index} ci={cart_item} className={cn.cartItem} />
                    ))}
                </div>

                <div className={cn.checkoutContainer}>
                    <h2>Checkout</h2>

                    <p>Total: {totall} Rs</p>
<h3 className={cn.disc}> Disclaimer : This is NOT a functional business yet. All the payments are only to support the developer and will not in any way deliver you any products OR make you profits for selling them (i.e artist account).
</h3>
                    <StripeCheckout
                        stripeKey={process.env.REACT_APP_KEY}
                        token={makePayment}
                        name='Pay with card'
                        currency='INR'
                        amount={totall*100}
                        billingAddress>
                        <button className='button-primary'>Pay Now</button>
                    </StripeCheckout>
                </div>
            </div>

            {/* todo: add checkout */}
        </div>
    );
};
