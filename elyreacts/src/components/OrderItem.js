import React, { useState, useContext } from "react";
import { FormInput } from "../components/FormInput";

// @ts-ignore
import cn from "./styles/OrderItem.module.scss";

const getPictureUrl = (pictureUrl) => {
    try {
        return require("../assets/postersDb/" + pictureUrl.split("Db")[1].substring(1));
    } catch (err) {
        // fixme: Remove this as it shouldn't be necessary outside of testing
        return "https://source.unsplash.com/random";
    }
};

export const OrderItem = ({ item, quantityPurchased, className = "" }) => {
    return (
        <div className={`${cn.container} ${className}`}>
            <div className={`${cn.previewContainer}`}>
                <a href={`/poster/${item._id}`}>
                    {/* todo: get image URL */}
                    <img src={getPictureUrl(item.pictureURL)} alt={item.title} />
                </a>
            </div>

            <div className={`${cn.caption}`}>
                <h3>{item.title}</h3>

                <strong>{quantityPurchased} purchased</strong>
                <strong className={cn.priceSingle}>₹ {item.price.toFixed(2)} each</strong>
                <strong className={cn.priceSubtotal}>
                    ₹ {(item.price * quantityPurchased).toFixed(2)} total
                </strong>
            </div>
        </div>
    );
};
