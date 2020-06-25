import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { PostersList } from "../components/PostersList";
import { GlobalContext } from "../context/GlobalState";
import LoadingIcon from "../components/LoadingIcon";

// @ts-ignore
import cn from "./styles/PostersWall.module.scss";

export const PostersWall = ({ category = "latest" }) => {
    let {
        posters: { isLoading, error, posters },
        getPosters,
    } = useContext(GlobalContext);

    // todo/fixme(future): Use React Suspense instead of fetching async data inside useEffect
    useEffect(() => {
        getPosters(category);
    }, [category]);

    if (error) return <span>An error occurred: {error.message}</span>;
    if (!posters) return <LoadingIcon />;

    return (
        <div className={`page-container`}>
            <div className={`page-header`}>
                <h1 className='page-title'>Posters</h1>
                <p className='page-preface'>{category}</p>
            </div>

            <div className='lower-content-container'>
                <div className={`tiled-list-container ${cn.categoryWrapper}`}>
                    <span>Category</span>

                    <ul className={`style-li-inline tiled-list ${cn.categoryContainer}`}>
                        <li className={category === "latest" ? "active" : ""}>
                            <Link to='/posters/latest'>Recent</Link>
                        </li>
                        <li className={category === "popular" ? "active" : ""}>
                            <Link to='/posters/popular'>Popular</Link>
                        </li>
                        <li className={category === "graphic-design" ? "active" : ""}>
                            <Link to='/posters/graphic-design'>Graphic Design</Link>
                        </li>
                        <li className={category === "textography" ? "active" : ""}>
                            <Link to='/posters/textography'>Textography</Link>
                        </li>
                        <li className={category === "photoshop" ? "active" : ""}>
                            <Link to='/posters/photoshop'>Photoshop</Link>
                        </li>
                        <li className={category === "photography" ? "active" : ""}>
                            <Link to='/posters/photography'>Photography</Link>
                        </li>
                        <li className={category === "all" ? "active" : ""}>
                            <Link to='/posters/all'>All</Link>
                        </li>
                    </ul>
                </div>

                {isLoading && <span>Loading...</span>}
                {!isLoading && error && <span>Error - see console</span>}
                {!isLoading && !error && <PostersList posters={posters} />}
            </div>
        </div>
    );
};
