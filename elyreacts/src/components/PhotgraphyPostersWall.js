import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext,useState } from "react";
import {Poster} from "../components/Poster";
import { PostersList } from "./PostersList";

export const PostersPhotography = () => {
    let {posters,getPostersPhotography} = useContext(GlobalContext)
    useEffect(()=>{
          getPostersPhotography();
        //ex-lint-disable-next-line
    },[])

    return (
      <div>
        <PostersList cat = 'Photography' posters = {posters}/>        
      </div>
    )
}
