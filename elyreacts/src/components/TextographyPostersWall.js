import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext,useState } from "react";
import {Poster} from "../components/Poster";

export const PostersTextography = () => {
    let {posters,getPostersTextography} = useContext(GlobalContext)
    useEffect(()=>{
          getPostersTextography();
        //ex-lint-disable-next-line
    },[])

    return (
      <div>
          <h1>Textography Posters</h1>
        {posters.map((poster, index) => (
          <div>
             < Poster key={poster._id} index={index} poster={poster} /> 
          </div>
        ))}         
      </div>
    )
}
