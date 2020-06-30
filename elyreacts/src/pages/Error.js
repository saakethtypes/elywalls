import React from "react";

export const Error = ({ errorID = 0, ...props }) => {
    const getErrorMessageString = (errorID) => {
        switch (errorID.toString()) {
            case "400":
                return "The request was incomplete.";
            case "401":
                return "You are not authorised to access this page.";
            case "403":
                return "You are not authorised to access this page.";
            case "404":
                return "This page doesn't exist.";
            case "500":
                return "You can't access this page due to an issue with the server. Please try again later.";
            case "502":
                return "You can't access this page due to an issue with the server. Please try again later.";
            default:
                return "An error occurred. Please try again later.";
        }
    };

    return (
        <div className='page-container'>
            <div className='page-header'>
                <h1>Error{errorID !== 0 ? " " + errorID.toString() : ""}</h1>
                <p>{getErrorMessageString(errorID)}</p>
            </div>

            <section>
                <h2>What To Do Next</h2>
                <p>Go back and try again, or try clearing your browser cache.</p>
                {/*
                <p>Please try the following steps to continue</p>

                <ul className='regular'>
                    <li>Go back to the previous page and try again</li>
                    <li>Sign out, then sign in and try again</li>
                    <li>Clear your browser cache and cookies</li>
                    <li>Try again later</li>
                </ul>*/}
            </section>
        </div>
    );
};

export default Error;
