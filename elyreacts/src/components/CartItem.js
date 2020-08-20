import React, { useState, useContext } from 'react';
import { FormInput } from '../components/FormInput';
import { GlobalContext } from '../context/GlobalState';
/*eslint-disable*/

// @ts-ignore \n /*eslint-disable*/
 /*eslint-disable*/

import cn from './styles/CartItem.module.scss';

export const CartItem = ({
    ci,
    className
}) => {
    let { removeFromCart, setCartItemQuantity } = useContext(GlobalContext);
    const [quantity, setquantity] = useState(ci.quantity);
    const remfromcart = (e, cid) => {
        e.preventDefault();
        removeFromCart(cid);
    };
    const cq = (q) => {
        if(Number(q)>1){
            setCartItemQuantity(ci._id, Number(q), ci.item.price * Number(q));
        }};
    let picUrl = null
    try{  let purl = ci.item.pictureURL.split("Db/")[1] 

    picUrl = require("/home/ubuntu/elywalls.com/DB/assets/postersDb/"+purl)
}catch{let x = 0}

    return (
        <div className={`${cn.container} ${className}`}>
            <div className={`${cn.previewContainer}`}>
                <a href={`/poster/${ci.item._id}`}>
                    { /* todo: get URL  ||'https://source.unsplash.com/random'}*/}
                    <img src={picUrl||'https://source.unsplash.com/random'}  alt={ci.item.title} />
                </a>
            </div>

            <div className={`${cn.caption}`}>
                <h3>{ci.item.title}</h3>
                <strong className={cn.priceSingle}>{ci.item.price.toFixed(2)} each</strong>
                <strong className={cn.priceSubtotal}>{(ci.item.price * quantity).toFixed(2)}</strong>

                <FormInput
                    className={cn.quantitySelector}
                    type="number"
                    name="Quantity"
                    value={quantity}
                    inputProps={{
                        inputMode: "number",
                        min : "1",
                        onChange: e => {
                            setquantity(e.target.value);
                            cq(e.target.value);
                        }
                    }} />

                <button onClick={e => remfromcart(e, ci._id)}>Remove</button>
            </div>
        </div>
    );
};
