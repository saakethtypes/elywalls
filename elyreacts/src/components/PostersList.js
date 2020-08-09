import React,{useRef } from "react";
import Masonry from "react-masonry-component";

import { Poster, FakePoster } from "../components/Poster";

// @ts-ignore \n /*eslint-disable*/
 /*eslint-disable*/

import cn from "./styles/PostersList.module.scss";

export const PostersList = ({ posters = [], noButtons = false, cat = "" }) => {
    const rMasonryEl = useRef();
    return (
        <div className={cn.postersListContainer}>
            {posters.length > 0 && (
                <Masonry
                    elementType={"div"}
                    options={{
                        fitWidth: true,
                        horizontalOrder: true,
                        resize: true,
                    }}
                    ref={rMasonryEl}>
                    {posters.map((poster, index) => (
                        <Poster
                            noButtons={noButtons}
                            className={cn.posterContainer}
                            key={poster._id}
                            poster={poster}
                            cat={cat}
                        />
                    ))}
                </Masonry>
            )}

            {posters.length === 0 && (
                <div>
                    <FakePoster className={`${cn.posterContainer} ${cn.fakePoster}`} />
                </div>
            )}
        </div>
    );
};
