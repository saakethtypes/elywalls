import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext,useState } from "react";
import {Poster} from "../components/Poster";

export const PostersPhotography = () => {
    let {posters,getPostersPhotography} = useContext(GlobalContext)
    useEffect(()=>{
          getPostersPhotography();
        //ex-lint-disable-next-line
    },[])

    return (
      <div>
          <h1>Photography Posters</h1>
        {posters.map((poster, index) => (
          <div>
             < Poster key={poster._id} index={index} poster={poster} /> 
          </div>
        ))}         
      </div>
    )
}
