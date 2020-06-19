import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext, useState } from "react";
import LinkButton from "../components/LinkButton";
import { PostersList } from "../components/PostersList";

// @ts-ignore
import cn from "./styles/Poster.module.scss";
import { Recommends } from "../components/Recommends";

const ButtonAction = ({ onClickHandler, activated = false, children }) => {
    // todo: checkActiveFn is a function which checks the Active state of the button
    // eg: checkActiveFn could return true if Poster is Admired
    // this would then add the active class to the button
    return (
        <button
            className={`button-icon ${activated ? "active" : ""}`}
            onClick={onClickHandler}>
            {children}
        </button>
    );
};

export const Poster = ({ posterID, props }) => {
    let {
        user,
        cart,
        log_status,
        getPoster,
        admirePoster,
        unadmirePoster,
        addToCart,
        poster,
    } = useContext(GlobalContext);
    const [signin, setsignin] = useState(false);

    useEffect(() => {
        getPoster(posterID);
        console.log(user ? true : false);
        user ? setsignin(true) : setsignin(false);
    }, []);

    let picUrl = null;
    try {
        let purl = poster.pictureURL.split("Db\\")[1];
        console.log(purl);
        picUrl = require("../assets/postersDb/" + purl);
        console.log(picUrl);
        // todo: what is this x=0 for??
    } catch {
        let x = 0;
    }
    // The following booleans are only used for state updates in this component.
    // DO NOT use them to check the Admired/Cart status, use checkAdmires() and checkCart() instead.
    const [isAdmired, setIsAdmired] = useState(true);
    const [admires, setAdmires] = useState((poster && poster.admires) || 0);
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [inCart, setinCart] = useState(false); // todo: Set to num of posters already in user's cart
    //let ss = require('../assets/postersDb/Hello Worldmr robot elliot tvseries1590922099565.jpeg')

    // Sanitise poster data
    // todo: Verify data server-side (or at least earlier in the flow, than this component)
    poster = {
        ...poster,
        id: (poster && poster._id) || posterID,
        title: (poster && poster.title) || "Untitled",
        author: (poster && poster.madeBy) || "Unknown",
        category: (poster && poster.category) || "Unknown",
        caption:
            (poster && poster.caption) ||
            "This poster didn't come with a caption.",
        //  ||
        //     `A poster in the category ${poster && poster.category || 'Unknown'}, created by ${poster && poster.madeBy || 'Unknown'}.`,
        // // which ever picture is not showing that is latest . to view that we need to use href = require(pictureURL)
        //therefore delting whole db with invalid poster paths
        // todo: //
        // Store the images somewhere else, then you should use the fully-qualified URL when fetching the images. eg:
        // images stored on Amazon S3 (or similar CDN)
        // -- pictureURL should point to the image's location on the CDN
        // -- alternatively, pictureURL could be a file blob, which is sent to the server as a request, and then the server sends the image data back
        price: (poster && poster.price) || 0.0,
        views: (poster && poster.views) || 0,
        admires: (poster && poster.admires) || 0,
    };

    const checkAdmires = () => {
        // Check the users' Admired posters
        let match = [];

        if (user) {
            match = user.admires.filter((ap) => ap._id === poster._id);
        } else console.warn("user is undefined");
        return match.length > 0;
    };

    const checkCart = () => {
        console.log("checking");
        // Check the users' cart
        // todo/fixme: This doesn't work because user is never updated.
        // todo/fixme: Using this component's state to check cart for the time being
        let match = [];

        if (user) {
            setsignin(true);
            match = cart.filter((ap) => ap.item._id === poster._id);
        } else {
            console.warn("user is undefined");
        }
        // if (user)
        //   match = user.cart.filter((ap) => ap.item._id === poster._id);
        // else
        //   console.warn("user is undefined");

        return match.length > 0;
        //return isAddedToCart;
    };

    const handleClickAdmire = (e) => {
        e.preventDefault();
        if (!checkAdmires()) {
            admirePoster(poster);
            setIsAdmired(true);
            setAdmires(admires + 1);
        } else {
            unadmirePoster(poster);
            setIsAdmired(false);
            setAdmires(admires - 1);
        }
    };
    const handleClickCart = (e) => {
        if (user) setsignin(true);
        else setsignin(false);
        if (!checkCart()) {
            addToCart(poster._id);
            setIsAddedToCart(true);
        } else {
            // todo: Notify user - Already added to cart
            setinCart(true);
            console.log("Already added to cart");
        }
    };

    return (
        <div className='page-container'>
            <div className='page-header'>
                <h1>{poster.title}</h1>
                <p>{poster.caption}</p>
            </div>

            <div className={`${cn.contentContainer} lower-content-container`}>
                <div className={cn.imageContainer}>
                    {picUrl !== null ? (
                        <img src={picUrl} alt={poster.title} />
                    ) : (
                        <img src={picUrl} alt={poster.title} />
                    )}
                    {log_status && (
                        <div className={`${cn.buttons}`}>
                            <ButtonAction
                                onClickHandler={handleClickAdmire}
                                activated={isAdmired}>
                                ❤
                            </ButtonAction>
                        </div>
                    )}
                </div>

                <div className={`${cn.informationContainer}`}>
                    <h3>{poster.title}</h3>
                    <small>
                        By{" "}
                        <a href={`/profile/${poster.author}`}>
                            {poster.author}
                        </a>
                    </small>

                    <div className={cn.admiresContainer}>
                        <span className={cn.iconLikes}></span>
                        <strong>{admires}</strong>
                    </div>

                    <div className={cn.viewsContainer}>
                        <span className={cn.iconViews}></span>
                        <strong>{poster.views}</strong>
                    </div>

                    <p>{poster.caption}</p>

                    <strong className={cn.price}>
                        {poster.price.toFixed(2)}
                    </strong>

                    <div className={`${cn.formContainer} form-container`}>
                        {signin ? (
                            <button
                                onClick={handleClickCart}
                                className='primary'>
                                Add to Cart
                            </button>
                        ) : (
                            <LinkButton to='/login'>Sign in to Buy</LinkButton>
                        )}
                        {!inCart ? (
                            <small>Add to your cart to purchase</small>
                        ) : (
                            <small>{poster.title} is added to your cart</small>
                        )}
                    </div>
                </div>
            </div>

            {poster.category !== "Unknown" && (
                <div className='lower-content-container'>
                    <section>
                        <h2>Recommended</h2>
                        <Recommends
                            cat={poster.category}
                            aid={poster.author}
                            pid={poster._id}
                        />
                    </section>
                </div>
            )}
        </div>
    );
};

export const FakePoster = () => {
    return (
        <div className={`${cn.container}`}>
            <div className={`${cn.previewContainer}`}>
                <a href={`/posters/all`}>
                    {/* // todo: make this a placeholder image, like a sad face or something */}
                    <img
                        src={"https://source.unsplash.com/random/640x480"}
                        alt={"Blank image"}
                    />
                </a>
            </div>

            <div className={`${cn.caption}`}>
                <h2>Sorry!</h2>
                <small>No results found</small>
            </div>
        </div>
    );
};
