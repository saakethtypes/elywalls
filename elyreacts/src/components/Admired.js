import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext,useState } from "react";
import {Poster} from "../components/Poster";

export const Admired = () => {
  let { user } = useContext(GlobalContext);
    return (
      <div>
          <h1>Admired</h1>
        {user.admires.map((poster, index) => (
          <div key={poster._id}>
             < Poster key={poster._id} index={index} poster={poster} /> 
          </div>
        ))}         
      </div>
    )
}
