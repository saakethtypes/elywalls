import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext, useState } from "react";

export const UserProfile = () => {
    let { user, getProfileUser } = useContext(GlobalContext);
    useEffect(() => {
        getProfileUser();
    }, []);
    return (
        <div>
            <h2>{user.name}</h2>
            {/* <h3>Views - {user.profileViews}</h3> */}
        </div>
    );
};
