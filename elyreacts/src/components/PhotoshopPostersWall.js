import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext,useState } from "react";
import {Poster} from "../components/Poster";

export const PostersPhotoshop = () => {
    let {posters,getPostersPhotoshop} = useContext(GlobalContext)
    useEffect(()=>{
          getPostersPhotoshop();
        //ex-lint-disable-next-line
    },[])

    return (
      <div>
          <h1>Photoshop Posters</h1>
        {posters.map((poster, index) => (
          <div  key={poster._id}>
             < Poster index={index} poster={poster} /> 
          </div>
        ))}         
      </div>
    )
}
