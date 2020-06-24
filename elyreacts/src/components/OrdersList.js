import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { OrderItem } from './OrderItem'

export const OrdersList = () => {

    const {orders,getOrders} = useContext(GlobalContext)

    useEffect(() => {
        getOrders()
    }, [])
    return (
        <div>
            <h1>Your Orders - {orders.length}</h1>
            {orders&&orders.length>0?
                orders.map((oi)=>
                <OrderItem order={oi}/>
            ):null
            }
        </div>
    )
}
