import React, { useEffect, useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";

import LinkButton from "../components/LinkButton";
import { Recommends } from "../components/Recommends";

// @ts-ignore
import cn from "./styles/Poster.module.scss";

const ButtonAction = ({ onClickHandler, activated = false, children }) => {
    return (
        <button className={`button-icon ${activated ? "active" : ""}`} onClick={onClickHandler}>
            {children}
        </button>
    );
};

const getPictureUrl = (pictureUrl) => {
    try {
        return require("../assets/postersDb/" + pictureUrl.split("Db")[1].substring(1));
    } catch (err) {
        // todo/fixme: Remove this as it shouldn't be necessary outside of testing
        return "https://source.unsplash.com/random";
    }
};
let liked = true 
export const Poster = ({ posterID }) => {
    let {
        user,
        cart,
        log_status: isLoggedIn,
        getPoster,
        admirePoster,
        unadmirePoster,
        addToCart,
        admires,
        poster,
    } = useContext(GlobalContext);

    useEffect(() => {
        getPoster(posterID);
    }, []);

    

    poster = {
        ...poster,
        id: (poster && poster._id) || posterID,
        title: (poster && poster.title) || "Untitled",
        author: (poster && poster.madeBy) || "Unknown",
        category: (poster && poster.category) || "Unknown",
        caption: (poster && poster.caption) || "This poster didn't come with a caption.",
        price: (poster && poster.price) || 0.0,
        views: (poster && poster.views) || 0,
        admires: (poster && poster.admires) || 0,
    };

    const [admiresp, setAdmiresp] = useState( poster && poster.admires );
    const [isAdmired, setIsAdmired] = useState(
        (poster && user && admires.filter((ap) => ap._id === poster._id).length !== 0) || false
    );
    const [isAddedToCart, setIsAddedToCart] = useState(
        (poster && cart && cart.filter((ap) => ap.item._id === poster._id).length !== 0) || false
    );

    const checkAdmires = () => {
        let match = [];
        if (user) match = admires.filter((ap) => ap._id === poster._id);
        console.log(match)
        return match.length > 0;
    };

    const checkCart = () => {
        let match = [];
        if (user) match = cart.filter((ap) => ap.item._id === poster._id);
        return match.length > 0;
    };

    const handleClickAdmire = (e) => {
        if (!checkAdmires() ) {
            liked = true
            admirePoster(poster);
            setIsAdmired(true);
            setAdmiresp(admiresp + 1);
        } else {
            liked = false
            unadmirePoster(poster);
            setIsAdmired(false);
            setAdmiresp(admiresp - 1);
        }
    };

    const handleClickCart = (e) => {
        if (!checkCart()) {
            addToCart(poster._id);
            setIsAddedToCart(true);
        } else {
            setIsAddedToCart(true);
            console.log("Already added to cart");
        }
    };

    const getAdmireIcon = (fill) => {
        if (!fill) return <span>❤</span>;
        return <span className={cn.iconLikes}></span>;
    };

    return (
        <div className='page-container'>
            <div className='page-header'>
                <h1>{poster.title}</h1>
                <p>{poster.caption}</p>
            </div>

            <div className={`${cn.contentContainer} lower-content-container`}>
                <div className={cn.imageContainer}>
                    <img src={getPictureUrl(poster.pictureURL)} alt={poster.title} />
                    {isLoggedIn && (
                        <div className={`${cn.buttons}`}>
                            <ButtonAction onClickHandler={handleClickAdmire} activated={isAdmired}>
                                {getAdmireIcon(isAdmired)}
                            </ButtonAction>
                        </div>
                    )}
                </div>

                <div className={`${cn.informationContainer}`}>
                    <h3>{poster.title}</h3>
                    <small>
                        By <a href={`/profile/${poster.author}`}>{poster.author}</a>
                    </small>

                    <div className={cn.admiresContainer}>
                        <span className={cn.iconLikes}></span>
                        <strong>{admiresp}</strong>
                    </div>

                    <div className={cn.viewsContainer}>
                        <span className={cn.iconViews}></span>
                        <strong>{poster.views}</strong>
                    </div>

                    <p>{poster.caption}</p>

                    <strong className={cn.price}>{poster.price.toFixed(2)}</strong>

                    <div className={`${cn.formContainer} form-container`}>
                        {isLoggedIn ? (
                            <button onClick={handleClickCart} className='primary'>
                                Add to Cart
                            </button>
                        ) : (
                            <LinkButton to='/login'>Sign in to Buy</LinkButton>
                        )}
                        {!isAddedToCart ? (
                            <small>Add to your cart to purchase</small>
                        ) : (
                            <small>{poster.title} is already in your cart</small>
                        )}
                    </div>
                </div>
            </div>

            {poster.category !== "Unknown" && (
                <div className='lower-content-container'>
                    <section>
                        <h2>Recommended</h2>
                        <p>If you like {poster.title}, you'll probably like these too.</p>

                        <Recommends cat={poster.category} aid={poster.author} pid={poster._id} />
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
                    <img src={"https://source.unsplash.com/random/640x480"} alt={"Blank image"} />
                </a>
            </div>

            <div className={`${cn.caption}`}>
                <h2>Sorry!</h2>
                <small>No results found</small>
            </div>
        </div>
    );
};
