import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext,useState } from "react";
import {PostersList} from "../components/PostersList";

export const PostersGraphic = () => {
    let {posters,getPostersGraphic} = useContext(GlobalContext)
    useEffect(()=>{
          getPostersGraphic();
        //ex-lint-disable-next-line
    },[])


    return (
      <div>
                 <PostersList cat = 'Graphic' posters = {posters}/>        
         
      </div>
    )
}
