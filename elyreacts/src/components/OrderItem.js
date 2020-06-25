import React from "react";
import { Link } from "react-router-dom";
import LinkButton from "../components/LinkButton";

//@ts-ignore
import cn from "./styles/OrderItem.module.scss";

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

const getPictureURL = (url) => {
    return "https://source.unsplash.com/random/2160x1440";
};

export const OrderItem = ({ order }) => {
    const orderDate = new Date(order.orderedOn);

    return (
        <div className={cn.container}>
            <Link to={`/order/${order._id}`} className={cn.imageContainer}>
                <img
                    src={getPictureURL(order.purchased_items[0].item.pictureURL)}
                    alt={`Preview of ${order.purchased_items[0].item.title}`}
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
