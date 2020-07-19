import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import Masonry from "react-masonry-component";

import { Poster, FakePoster } from "../components/Poster";

// @ts-ignore
import cn from "./styles/PostersList.module.scss";

export const PostersList = ({ posters = [], noButtons = false, cat = "" }) => {
    const rMasonryEl = useRef();
    const [scrollForever, setScrollForever] = useState(false);
    // todo: ^ set true when "Load more" button is clicked, then always load more at bottom of page

    // useEffect(() => {
    //   window.addEventListener('resize', (e) => {
    //   });
    // }, [])
    const loadMore = () =>{
        setScrollForever(true)
    }

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
            <button onClick={loadMore}>Load more</button>

            {posters.length === 0 && (
                <div>
                    <FakePoster className={`${cn.posterContainer} ${cn.fakePoster}`} />
                </div>
            )}
        </div>
    );
};
