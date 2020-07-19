import React, { useEffect, useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";

import LinkButton from "../components/LinkButton";
import { Recommends } from "../components/Recommends";
import LoadingIcon from "../components/LoadingIcon";

// @ts-ignore
import cn from "./styles/Poster.module.scss";
import { Link } from "react-router-dom";
import { SalesItem } from "../components/SalesItem";

const ButtonAction = ({ onClickHandler, light = false, activated = false, children }) => {
    return (
        <button
            className={`button-icon ${light ? "light" : ""} ${activated ? "active" : ""}`}
            onClick={onClickHandler}>
            {children}
        </button>
    );
};

const getPictureUrl = (pictureUrl) => {
    try {
        return require("../assets/postersDb/" + pictureUrl.split("Db")[1].substring(1));
    } catch (err) {
        // fixme: Remove this as it shouldn't be necessary outside of testing
        return "https://source.unsplash.com/random";
    }
};
let liked = true;
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
    const [admiresp, setAdmiresp] = useState(null);
    const [isAdmired, setIsAdmired] = useState(
        (user && admires.filter((ap) => ap._id == posterID).length !== 0) 
    );
    const [isAddedToCart, setIsAddedToCart] = useState(
        (poster && cart && cart.filter((ap) => ap.item._id === posterID).length !== 0) || false
    );

    const checkAdmires = () => {
        let match = [];
        if (user) match = admires.filter((ap) => ap._id === posterID);
        return match.length > 0;
    };

    const checkCart = () => {
        let match = [];
        if (user) match = cart.filter((ap) => ap.item._id === posterID);
        return match.length > 0;
    };
    const handleClickAdmire = (e) => {
        if (!checkAdmires()) {
            liked = true;
            admirePoster(poster);
            setIsAdmired(true);
            setAdmiresp(poster.admires + 1);
        } else {
            liked = false;
            unadmirePoster(poster);
            setIsAdmired(false);
            setAdmiresp(poster.admires );
        }
    };

    const handleClickCart = (e) => {
        if (!checkCart()) {
            addToCart(posterID);
            setIsAddedToCart(true);
        } else {
            setIsAddedToCart(true);
            console.log("Already added to cart");
        }
    };

    const getAdmireIcon = (fill) => {
        if (!fill) return <span>❤</span>;
        return <span className='icon-likes'></span>;
    };
    
    const getDPUrl = (pictureUrl) => {
        try {
            return require("../assets/artistsDp/" + pictureUrl.split("Dp")[1].substring(1));
        } catch (err) {
            // todo/fixme: Remove this as it shouldn't be necessary outside of testing
            return "https://source.unsplash.com/random";
        }
    };
    if (!poster) return <LoadingIcon />;

    return (
        <div className='page-container'>
            <div className={`lower-content-container ${cn.container}`}>
                <div className={cn.imageContainer}>
                    <img src={getPictureUrl(poster.pictureURL)} alt={poster.caption} />
                </div>

                <div className={`${cn.informationContainer}`}>
                    <div className={cn.statsContainer}>
                        <span className='icon-likes'></span>
                        <small className={cn.countLikes}>{admiresp || poster.admires}</small>

                        <span className='icon-views'></span>
                        <small className={cn.countViews}>{poster.views}</small>
                    </div>

                    <h1>{poster.title}</h1>

                    <div className={cn.authorContainer}>
                        <Link to={`/profile/${poster.author}`}>
                            <img
                                src={getDPUrl(poster.artistDp)}
                                alt={poster.author}
                            />
                        </Link>
                        <small>
                            By <a href={`/profile/${poster.author}`}>{poster.author}</a>
                        </small>
                    </div>
                    <p>{poster.caption}</p>

                    <strong className={cn.price}>₹ {poster.price.toFixed(2)}</strong>
                    
                    <div className={cn.ctaButtons}>
                        {isLoggedIn?
                            user.user_type =='buyer'?
                            <div>
                                <br></br>
                                <h2>Purchase</h2>
                                <br></br>
                            <button
                                disabled={isAddedToCart}
                                onClick={handleClickCart}
                                className='button-primary'>
                                {isAddedToCart && "Already in Cart"}
                                {!isAddedToCart && "Add to Cart"}
                            </button>

                            <ButtonAction
                                light
                                onClickHandler={handleClickAdmire}
                                activated={isAdmired}>
                                {getAdmireIcon(isAdmired)}
                            </ButtonAction>
                            </div>:
                            <div>
                                <br></br>
                            <ButtonAction
                                light
                                onClickHandler={handleClickAdmire}
                                activated={isAdmired}>
                                {getAdmireIcon(isAdmired)}
                            </ButtonAction>
                            </div>
                         : (
                            <LinkButton to='/login'>Sign in to Buy</LinkButton>
                        )}
                    </div>
                    {isLoggedIn?
                            user.username == poster.author?
                            <div>
                                <br></br>
                <strong>{poster.purchases||0} sold</strong>
                <br></br>
                <br></br>
                <strong>
                    <span>⇧</span>₹ {((poster.price * (poster.purchases||0))/2).toFixed(2)} made
                </strong>
                            </div>                            
                        :null:null}
                </div>
                
            </div>

            {poster.category !== "Unknown" && (
                <div className={`lower-content-container ${cn.lowerContent}`}>
                    <section>
                        <h2>Recommended</h2>
                        <p>If you like {poster.title}, you'll probably like these too.</p>

                        <Recommends cat={poster.category} aid={poster.author} pid={posterID} />
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
