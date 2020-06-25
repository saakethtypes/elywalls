import React, { useEffect, useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

export const Order = ({ oid ,props}) => {
    console.log({oid})
    const {order,getOrder} = useContext(GlobalContext)
     useEffect(() => {
        getOrder(oid)
    }, [])
    console.log(order)
    return (
        <div>
            <h2>Order on {order.orderedOn}</h2>
            <h2>Ordered to {order.billing_adress}</h2>
            {/* {order.purchased_items.map((op)=>
            <div>
                <h2> {op.quanitity} items of</h2>
            </div>
            )} */}
        </div>
    )
}

