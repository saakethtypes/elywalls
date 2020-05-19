import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext,useState } from "react";
import {Poster} from "../components/Poster";

export const PostersAll = () => {
    let {posters,getPostersAll} = useContext(GlobalContext)
    useEffect(()=>{
          getPostersAll();
        //ex-lint-disable-next-line
    },[])

    return (
      <div>
          <h1>All Posters</h1>
        {posters.map((poster, index) => (
          <div  key={poster._id}>
             < Poster index={index} poster={poster} /> 
          </div>
        ))}         
      </div>
    )
}
