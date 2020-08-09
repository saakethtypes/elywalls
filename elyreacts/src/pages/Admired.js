import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext } from "react";
/*eslint-disable*/

import { PostersList } from "../components/PostersList";
import LoadingIcon from "../components/LoadingIcon";

//@ts-ignore
import cn from "./styles/Admired.module.scss";

export const Admired = () => {
    let { admires, user, getAdmiredPosters } = useContext(GlobalContext);
    useEffect(() => {
        getAdmiredPosters();
    }, []);

    if (!user || !admires) return <LoadingIcon />;

    return (
        <div className={`page-container`}>
            <div className={`page-header`}>
                <h1 className='page-title'>Admires</h1>
                <p className='page-preface'>{user.name}'s Admires</p>
            </div>

            <div className='lower-content-container'>
                {admires && <PostersList className={cn.postersList} posters={admires} />}
            </div>
        </div>
    );
};
