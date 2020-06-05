import React, { useState, useContext } from 'react';
import { FormInput } from '../components/FormInput';
import { Poster } from '../components/Poster';
import { GlobalContext } from '../context/GlobalState';

// @ts-ignore
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
        setCartItemQuantity(ci._id, Number(q), ci.item.price * Number(q));
    };
    return (
        <div className={`${cn.container} ${className}`}>
            <div className={`${cn.previewContainer}`}>
                <a href={`/poster/${ci._id}`}>
                    { /* todo: get URL */}
                    <img src={/*ci.item.pictureURL ||*/ 'https://source.unsplash.com/random'} alt={ci.item.title} />
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
