import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext, useState } from "react";

// @ts-ignore
import cn from './styles/Poster.module.scss';

export const Poster = ({ poster, large = false }) => {
  const { user,log_status, admirePoster,unadmirePoster,addToCart } = useContext(GlobalContext);

  poster = {
    ...poster,
    id: poster._id,
    title: poster.title || 'Untitled',
    author: poster.author || 'Unknown',
    caption: poster.caption || 'Caption',
    pictureURL: /*poster.pictureURL ||*/ 'https://source.unsplash.com/random',
    price: poster.price || 0.0,
    views: poster.views || 0,
    admires: poster.admires || 0
  };
  
  const checkLike = () => {
    if(user){
    user.admires.map((admiredPoster)=>{
    if(admiredPoster._id==poster._id){
     setadmired(true) 
    }
  })}
}
    useEffect(() => {
      checkLike()
        }, [])

  const [admired, setadmired] = useState(false)
  const [admires, setadmires] = useState(poster.admires)
  const addtocart = (e) => {
    e.preventDefault()
    addToCart(poster);
  };
  const admirposter = (e) => {
    e.preventDefault()
    setadmires(admires+1)
    setadmired(true)
    admirePoster(poster)
  }
  const unadmirposter = (e) => {
    e.preventDefault()
    setadmires(admires-1)
    setadmired(false)
    unadmirePoster(poster._id)
  }
  return (
    <div className={`${cn.posterContainer}`}>
      <div className={`${cn.posterPreview}`}>
        <a href={poster.id} className={`${cn.posterLink}`}>
          <img src={poster.pictureURL} alt={poster.title ? poster.title : "Untitled Poster"} />
        </a>

        <div className={`${cn.posterCTA}`}>
          <button className="button-primary">Buy Now</button>
          <button className="button-secondary" onClick={addtocart}>Add to Cart</button>
        </div>
      </div>

      <div className={`${cn.posterInfoContainer}`}>
        <div className={`${cn.simple}`}>
          <h2>{poster.title || 'Untitled'}</h2>
          <small>{`By ${poster.author || 'Unknown'}`}</small>
          {log_status==true?admired?<button onClick={unadmirposter}>unadmire</button>
          :<button onClick={admirposter}>admire</button>:null}
          <strong>{admires}</strong>
          <strong className={`${cn.price}`}>{poster.price.toFixed(2) || '0.00'}</strong>
        </div>

        <div className={`${cn.extended} ${large ? '' : cn.extended_hidden}`}>
          <p>{poster.caption || `This is a poster by ${poster.author || 'Unknown'}, costing ${poster.price || '0.00'}.`}</p>
          <div className={`${cn.stats}`}>
            <span className={`${cn.stats__views}`}>{poster.views}</span>
            <span className={`${cn.stats__admires}`}>{poster.admires}</span>
          </div>
        </div>
      </div>
    </div>
  );
};