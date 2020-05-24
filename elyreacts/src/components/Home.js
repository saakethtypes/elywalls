import React from "react";
import { Link } from "react-router-dom";
import { PostersWall } from "./PostersWall";

// @ts-ignore
import cn from './styles/Home.module.scss';

export const Home = () => {
  //TODO show top 5 featured,popular,instafamous section of print ig wall

  return (
    <div className={`page-container`}>
      <div className={`page-heading`}>
        <h1 className={`page-title`}>Home</h1>
        <p>Elegant posters for your walls</p>
      </div>

      <div className={cn.bannerImage} id={cn.bannerImage}></div>

      <div className={cn.siteSectionLinkContainer}>
        <ul className="style-none">
          <li><Link to="/posters">Featured</Link></li>
          <li><Link to="/posters/textography">Textography</Link></li>
          <li><Link to="/posters/graphics">Graphics</Link></li>
          <li><Link to="/posters/photoshop">Photoshop</Link></li>
          <li><Link to="/posters/all">All Posters</Link></li>
        </ul>
      </div>

      <PostersWall />
    </div>
  );
};
