import React from 'react';
import { Link } from "react-router-dom";

export const ConfirmAccount = () => {
    return (
        <div>
            <h1>Your account has been Confirmed and crafted.</h1>
            <Link to="/login">
                  Sign In
                </Link>
        </div>
    );
};
