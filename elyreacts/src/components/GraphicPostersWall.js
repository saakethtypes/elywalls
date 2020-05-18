import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext,useState } from "react";
import {Poster} from "../components/Poster";

export const PostersGraphic = () => {
    let {posters,getPostersGraphic} = useContext(GlobalContext)
    useEffect(()=>{
          getPostersGraphic();
        //ex-lint-disable-next-line
    },[])


    console.log("posters",posters)
    return (
      <div>
          <h1>Graphic Posters</h1>
        {posters.map((poster, index) => (
          <div>
             < Poster key={poster._id} index={index} poster={poster} /> 
          </div>
        ))}         
      </div>
    )
}
