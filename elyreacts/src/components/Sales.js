import React, { useState,useEffect, useContext } from 'react'
import { GlobalContext } from '../context/GlobalState';
import { PostersList } from './PostersList';

export const Sales = ({ artistId }) => {
    let { user } = useContext(GlobalContext);
    const [profit, setprofit] = useState(0)
    const [sold, setsold] = useState(0)
    console.log("here sales")
    return (
        <div>
            <h1>Sales</h1>
            <h2>Total posters sold - {sold} </h2>
            <h2>Total profit made  - {profit} </h2>
            <div>
                <h2>Sales per poster</h2>
                <PostersList posters={user.postersmade} />
            </div>
        </div>
    )
}
