import React from 'react'
import {Poster} from '../components/Poster'
import { Link } from 'react-router-dom'
export const OrderItem = ({order}) => {
    console.log(order)
    return (
        <div>
            <h2>Date - {order.orderedOn}
            </h2>
            <h2>Billing Adress - {order.billing_adress}
            </h2>
            <h2>Total Price - {order.total_price}</h2>
            <Link to = {`/order/${order._id}`}>+ {order.purchased_items.length} more items </Link>
            <div>
            <Poster poster={order.purchased_items[0].item}/>
            
            </div>
            <h1>.</h1>
    
        </div>
    )
}
