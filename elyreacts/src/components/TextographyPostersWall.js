import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext,useState } from "react";
import {PostersList} from "../components/PostersList";

export const PostersTextography = () => {
    let {posters,getPostersTextography} = useContext(GlobalContext)
    useEffect(()=>{
          getPostersTextography();
        //ex-lint-disable-next-line
    },[])

    return (
      <div>
        <PostersList cat = 'Textography' posters = {posters}/>        
      </div>
    )
}
