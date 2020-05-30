import React from 'react';
import { Link } from "react-router-dom";

export const ConfirmAccount = () => {
    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Account</h1>
                <p className="page-preface">Your account has been verified</p>
            </div>

            <div className="lower-content-container">
                <p>Your account has been verified - now <Link to="/login">click here to sign in</Link>.</p>
            </div>
        </div>
    );
};
