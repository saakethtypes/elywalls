import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import LinkButton from "../components/LinkButton";
import { SalesItem } from "../components/SalesItem";

//@ts-ignore
import cn from "./styles/Sales.module.scss";

export const Sales = ({ artistId }) => {
    const { user , getSales} = useContext(GlobalContext);
    let totalSold = 0
    let totalProfit = 0

    useEffect(() => {
        getSales(artistId);
    }, [])

    user.postersmade.map((poster) =>{
        totalSold += poster.purchases
        totalProfit += poster.purchases * poster.price
    })
    return (
        <div className='page-container'>
            <div className='page-header'>
                <h1>Sales</h1>
                <p>Your sales and income on Elywalls</p>
            </div>

            <div className='lower-content-container'>
                <div className='information-container'>
                    <div className='information-grid'>
                        <span>Total Listed</span> <span>{user.postersmade.length}</span>
                        <span>Total Sold</span> <span>{totalSold}</span>
                        <span>Total Earnings</span> <span>{totalProfit}</span>
                    </div>

                    <div className='buttons-container'>
                        <LinkButton to='/publish-poster'>Publish A Poster</LinkButton>
                    </div>
                </div>

                <div className={cn.postersContainer}>
                    <h2>Your Posters</h2>

                    <div className={cn.salesItemsContainer}>
                        {/* todo: correct number sold */}
                        {user.postersmade.map((poster) => (
                            <SalesItem
                                key={poster._id}
                                className={cn.salesItem}
                                item={poster}
                                quantitySold= {poster.purchases||0}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
