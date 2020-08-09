import React from "react";

// @ts-ignore \n /*eslint-disable*/
 /*eslint-disable*/

import cn from "./styles/SalesItem.module.scss";

const getPictureUrl = (pictureUrl) => {
    try {
        return require("../assets/postersDb/" + pictureUrl.split("Db")[1].substring(1));
    } catch (err) {
        // fixme: Remove this as it shouldn't be necessary outside of testing
        return "https://source.unsplash.com/random";
    }
};

export const SalesItem = ({ item, quantitySold, className = "" }) => {
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

                <strong>{quantitySold} sold</strong>
                <strong>
                    <span>⇧</span>₹ {((item.price * quantitySold)/2).toFixed(2)} made
                </strong>
            </div>
        </div>
    );
};
