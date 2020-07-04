import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

import LinkButton from "./LinkButton";

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

export const Poster = ({ poster, noButtons = false, cat = "", className = "" }) => {
    const {
        user,
        cart,
        log_status: isLoggedIn,
        admirePoster,
        unadmirePoster,
        addToCart,
        removeFromCart,
    } = useContext(GlobalContext);

    const [admires, setAdmires] = useState(poster.admires);
    const [isAdmired, setIsAdmired] = useState(
        (user && user.admires.filter((ap) => ap._id === poster._id).length !== 0) || false
    );
    const [isAddedToCart, setIsAddedToCart] = useState(
        (cart && cart.filter((ap) => ap.item._id === poster._id).length !== 0) || false
    );

    poster = {
        ...poster,
        id: poster._id,
        title: poster.title || "Untitled",
        author: poster.madeBy || "Unknown",
        caption: poster.caption || "Caption",
        price: poster.price || 0.0,
        views: poster.views || 0,
        admires: poster.admires || 0,
    };

    const checkAdmires = () => {
        let match = [];
        if (user) match = user && user.admires.filter((ap) => ap._id === poster._id);
        return match.length > 0;
    };

    const checkCart = () => {
        let match = [];
        if (user) match = cart && cart.filter((ap) => ap.item._id === poster._id);
        return match.length > 0;
    };

    const handleClickAdmire = (e) => {
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
        if (!checkCart()) {
            addToCart(poster._id);
            setIsAddedToCart(true);
        }
    };

    const getAdmireIcon = (fill) => {
        if (!fill) return <span>❤</span>;
        return <span className='icon-likes'></span>;
    };

    return (
        <div className={`${className} ${cn.container}`}>
            <div className={cn.previewContainer}>
                <a href={`/poster/${poster.id}`}>
                    <img src={getPictureUrl(poster.pictureURL)} alt={poster.caption} />
                </a>

                {isLoggedIn && !noButtons && (
                    <div className={cn.buttons}>
                        <ButtonAction onClickHandler={handleClickAdmire} activated={isAdmired}>
                            {getAdmireIcon(isAdmired)}
                        </ButtonAction>
                        <ButtonAction onClickHandler={handleClickCart} activated={isAddedToCart}>
                            +
                        </ButtonAction>
                        {cat === "postersMade" && (
                            <LinkButton className='button-icon' to={`/edit-poster/${poster._id}`}>
                                ✎
                            </LinkButton>
                        )}
                    </div>
                )}
            </div>

            <div className={cn.caption}>
                <Link to={`/profile/${poster.author}`} className={cn.authorImageContainer}>
                    <img src='https://source.unsplash.com/random/128x128' alt={poster.author} />
                </Link>
                <h3>{poster.title}</h3>
                <small>
                    By <a href={`/profile/${poster.author}`}>{poster.author}</a>
                </small>
                <div className={cn.admiresContainer}>
                    <span className='icon-likes'></span>
                    <strong>{admires}</strong>
                </div>
                <strong className={cn.price}>{poster.price.toFixed(2)}</strong>
            </div>
        </div>
    );
};

export const FakePoster = ({ className = "" }) => {
    return (
        <div className={`${className} ${cn.container}`}>
            <div className={cn.previewContainer}>
                <a href={`/all`}>
                    {/* // todo: make this a placeholder image, like a sad face or something */}
                    <img src={"https://source.unsplash.com/random/640x480"} alt={"Blank image"} />
                </a>
            </div>

            <div className={cn.caption}>
                <h3>Sorry!</h3>
                <small>No results found</small>
            </div>
        </div>
    );
};
