import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext,useState } from "react";
import {PostersList} from "../components/PostersList";

export const PostersPhotoshop = () => {
    let {posters,getPostersPhotoshop} = useContext(GlobalContext)
    useEffect(()=>{
          getPostersPhotoshop();
        //ex-lint-disable-next-line
    },[])

    return (
      <div>
               <PostersList cat = 'Photshop' posters = {posters}/>        
       
      </div>
    )
}
