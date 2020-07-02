import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import LinkButton from "../components/LinkButton";
import { SalesItem } from "../components/SalesItem";

//@ts-ignore
import cn from "./styles/Sales.module.scss";

export const Sales = ({ artistId = null }) => {
    const { user } = useContext(GlobalContext);
    const [profit, setProfit] = useState(0);
    const [sold, setSold] = useState(0);

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
                        <span>Total Sold</span> <span>{sold}</span>
                        <span>Total Earnings</span> <span>{profit}</span>
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
                                quantitySold={54}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
