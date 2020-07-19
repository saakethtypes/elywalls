import React, { useContext } from 'react';

import LinkButton from '../components/LinkButton';

// @ts-ignore
import cn from './styles/Thankyou.module.scss';
import { GlobalContext } from '../context/GlobalState';

export const Thankyou = () => {
    const {order_placed} = useContext(GlobalContext)
    return (

        <div className="page-container">
            <div className="page-header">
                <h1>Thank You</h1>
                <p>Thank you for your purchase</p>
            </div>
            <div className="lower-content-container">
        {order_placed?
                <div className="information-container">
                    <h2>Order Details</h2>
                    <p>{order_placed.billing_adress}</p>
                </div>:null}
                <div className={cn.nextStepsContainer}>
                    <h2>Next Steps</h2>
                    <p>Now that you've placed your order, you can...</p>

                    <div className={cn.linksContainer}>
                        <LinkButton primary to="/posters/latest">
                            View Latest Posters
                        </LinkButton>
                        <LinkButton to="/orders">
                            View Your Orders
                        </LinkButton>
                    </div>
                </div>
            </div>
        </div>
    );
};
