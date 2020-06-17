import React, { useContext,useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { PostersList } from './PostersList'

export const Recommends = (cat,aid,pid) => {
    const {recommends ,getRecommends} = useContext(GlobalContext)
    useEffect(() => {
        getRecommends(cat.cat,cat.aid,cat.pid)
    }, [])
    console.log(recommends)

    return (
        <div>
            <h2>Similar works</h2>
            {recommends?
            <PostersList posters={recommends}/>
            :null}
        </div>
    )
}
