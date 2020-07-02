import React, { useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import LoadingIcon from "../components/LoadingIcon";
import { OrderItem } from "../components/OrderItem";

//@ts-ignore
import cn from "./styles/Order.module.scss";

const getMonthString = (raw) => {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    return months[raw.getMonth()];
};

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

export const Order = ({ oid, ...props }) => {
    const { order, getOrder } = useContext(GlobalContext);
    const orderDate = (order && new Date(order.orderedOn)) || new Date();

    useEffect(() => {
        getOrder(oid);
    }, []);

    if (!order) return <LoadingIcon pageName={`Order ${oid}`} />;

    return (
        <div className='page-container'>
            <div className='page-header'>
                <h1>Your Order</h1>
                <p>
                    Details for your order on{" "}
                    {`${orderDate.getDate()} ${getMonthString(orderDate)}`}
                </p>
            </div>

            <div className='lower-content-container'>
                <section className={cn.orderDetails}>
                    <h2>Order Details</h2>

                    <div className='information-grid'>
                        <span>ID</span> <span className={cn.forceBreak}>{oid}</span>
                        <span>Order Date</span> <span>{orderDate.toUTCString()}</span>
                        <span>Address</span> <span>{formatAddress(order.billing_adress)}</span>
                    </div>
                </section>

                <section className={cn.orderContents}>
                    <h2>Order Contents</h2>
                    {order.purchased_items.map(({ item, quantity }) => (
                        <OrderItem key={item._id} item={item} quantityPurchased={quantity} />
                    ))}
                </section>
            </div>
        </div>
    );
};
