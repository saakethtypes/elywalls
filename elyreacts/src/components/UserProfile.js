import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext,useState } from "react";

export const UserProfile = () => {
    const {user} = useContext(GlobalContext)
    return (
        <div>
            <h2>{user.profile.name}</h2>
    <h3>Views - {user.profile.profileViews}</h3>
        </div>
    )
}
