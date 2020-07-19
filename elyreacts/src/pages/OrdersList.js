import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Order } from "../components/Order";
import LinkButton from "../components/LinkButton";

//@ts-ignore
import cn from "./styles/OrdersList.module.scss";

const getGreeting = (n) => {
    if (n === 0 || n > 1) return `You have ${n} orders`;
    else return `You have ${n} order`;
};

export const OrdersList = () => {
    let { orders, getOrders } = useContext(GlobalContext);

    useEffect(() => {
        getOrders();
    }, []);

    // Can't be loading here because there's no isLoading, so we just have
    // to assume it's loaded and there's no actual orders
    if (!orders) orders = [];

    let ordersPending = orders.filter((oi) => oi.payment_status === false);
    let ordersPaid = orders.filter((oi) => oi.payment_status !== false);

    return (
        <div className='page-container'>
            <div className='page-header'>
                <h1>Your Orders</h1>
                <p>{getGreeting(orders.length)}</p>
            </div>

            <div className='lower-content-container'>
                {orders.length === 0 && (
                    <section className={cn.orders}>
                        <p>You haven't ordered anything yet.</p>

                        <LinkButton to='/posters'>Start Ordering</LinkButton>
                    </section>
                )}

                {ordersPending.length > 0 && (
                    <section className={cn.orders}>
                        <h2>Pending</h2>
                        <p>These orders are currently pending payment.</p>

                        <div className={cn.ordersContainer}>
                            {ordersPending.map((oi) => (
                                <Order order={oi} />
                            ))}
                        </div>
                    </section>
                )}
                {ordersPaid.length > 0 && (
                    <section className={cn.orders}>
                        <h2>Paid</h2>
                        <p>We're processing these orders - you should receive them soon.</p>
                        {orders.length > 0 && ordersPaid.map((oi) => <Order order={oi} />)}
                        
                    </section>
                )}
            </div>
        </div>
    );
};
