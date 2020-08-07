import React from "react";
import { Link } from "react-router-dom";
import LinkButton from "../components/LinkButton";

//@ts-ignore
import cn from "./styles/Order.module.scss";

const formatAddress = (raw) => {
    const [streetAddress, city, postcode] = raw.split(",");

    return (
        <ul className='address'>
            <li>{streetAddress}</li>
            <li>{city}</li>
            <li>{postcode}</li>
        </ul>
    );
};

const formatDate = (raw) => {
    return <p>{raw.toUTCString()}</p>;
};


const getPictureUrl = (pictureUrl) => {
    try {
        return require("../assets/postersDb/" + pictureUrl.split("Db")[1].substring(1));
    } catch (err) {
        // fixme: Remove this as it shouldn't be necessary outside of testing
        return "https://source.unsplash.com/random";
    }
};

export const Order = ({ order }) => {

    const orderDate = new Date(order.orderedOn);
    return (
        <div className={cn.container}>
            <Link to={`/order/${order._id}`} className={cn.imageContainer}>
                <div
                    className='image'
                    style={{
                        backgroundImage: `url("${
                            require("../assets/postersDb/"+
                            order.purchased_items[0].item.pictureURL.split("Db")[1].substring(1))
                        }")`,
                    }}
                />
            </Link>

            <div className={cn.orderIDContainer}>
                <small>ID: {order._id}</small>
            </div>

            <div className={cn.dateContainer}>
                <h3>Date</h3>
                {formatDate(orderDate)}
            </div>

            <div className={cn.addressContainer}>
                <h3>Address</h3>
                {formatAddress(order.billing_adress)}
            </div>

            <div className={cn.totalContainer}>
                <h3>Total</h3>
                <strong>{order.total_price || "Unknown"}</strong>
            </div>

            <LinkButton className={cn.buttonViewOrder} to={`/order/${order._id}`}>
                View Order
            </LinkButton>
        </div>
    );
};
