import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import { PostersList } from "./PostersList";
/* eslint-disable*/

export const Recommends = (cat, aid, pid) => {
    const { recommends, getRecommends } = useContext(GlobalContext);
    useEffect(() => {
        getRecommends(cat.cat, cat.aid, cat.pid);
    }, []);

    return recommends && <PostersList posters={recommends} />;
};
