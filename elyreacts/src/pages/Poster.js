import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext, useState } from "react";
// @ts-ignore
import cn from './styles/Poster.module.scss';
import { FormInput } from "../components/FormInput";

const ButtonAction = ({
    onClickHandler,
    activated = false,
    children
}) => {
    // todo: checkActiveFn is a function which checks the Active state of the button
    // eg: checkActiveFn could return true if Poster is Admired
    // this would then add the active class to the button
    return (
        <button
            className={`button-icon ${activated ? 'active' : ''}`}
            onClick={onClickHandler}>
            {children}
        </button>
    );
};

export const Poster = ({
    posterID
}) => {
    const {
        user,
        cart,
        log_status,
        getPoster,
        admirePoster,
        unadmirePoster,
        addToCart
    } = useContext(GlobalContext);
    // The above are constant. poster cannot be constant, as it must be mutated to check it.
    // However, the checking inside this file is temporary. When the data is checked in
    //  another file, this can be made a constant.
    let { poster } = useContext(GlobalContext);

    useEffect(() => {
        getPoster(posterID);
    }, []);

    let picUrl = null;
    let purl = poster.pictureURL.split('Db')[1];
    try {
        picUrl = require("../assets/postersDb" + purl);
    } catch (err) {
        console.log(`Failed to import file: ../assets/postersDb/${purl}`);
        picUrl = 'https://source.unsplash.com/random'; // todo: TEMPORARY WHILE I DON'T HAVE THE PICTURES LOCALLY
    }
    // The following booleans are only used for state updates in this component.
    // DO NOT use them to check the Admired/Cart status, use checkAdmires() and checkCart() instead.
    const [isAdmired, setIsAdmired] = useState(true);
    const [admires, setAdmires] = useState(poster && poster.admires || 0);
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [addToCartQuantity, setAddToCartQuantity] = useState(0);
    const [inCartQuantity, setInCartQuantity] = useState(0); // todo: Set to num of posters already in user's cart

    // let ss = require('../assets/postersDb/Hello Worldmr robot elliot tvseries1590922099565.jpeg');

    // Sanitise poster data
    // todo: Verify data server-side (or at least earlier in the flow, than this component)
    poster = {
        ...poster,
        id: poster && poster._id || posterID,
        title: poster && poster.title || 'Untitled',
        author: poster && poster.madeBy || 'Unknown',
        category: poster && poster.category || 'Unknown',
        caption: poster && poster.caption,
        //  ||
        //     `A poster in the category ${poster && poster.category || 'Unknown'}, created by ${poster && poster.madeBy || 'Unknown'}.`,
        // // which ever picture is not showing that is latest . to view that we need to use href = require(pictureURL)
        //therefore delting whole db with invalid poster paths
        // todo: //
        // Store the images somewhere else, then you should use the fully-qualified URL when fetching the images. eg:
        // images stored on Amazon S3 (or similar CDN)
        // -- pictureURL should point to the image's location on the CDN
        // -- alternatively, pictureURL could be a file blob, which is sent to the server as a request, and then the server sends the image data back
        price: poster && poster.price || 0.0,
        views: poster && poster.views || 0,
        admires: poster && poster.admires || 0
    };

    const checkAdmires = () => {
        // Check the users' Admired posters
        let match = [];

        if (user)
            match = user.admires.filter((ap) => ap._id === poster._id);
        else
            console.warn("user is undefined");

        return match.length > 0;
    };

    const checkCart = () => {
        // Check the users' cart
        let match = [];

        if (user)
            match = cart.filter((ap) => ap.item._id === poster._id);
        else
            console.warn("user is undefined");

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
    console.log(poster);
    const handleFormSubmit = (e) => {
        e.preventDefault();

        setIsAddedToCart(true);
        setInCartQuantity(inCartQuantity + addToCartQuantity);

        addToCart(poster._id);
        //addToCart(poster,addToCartQuantity) in future have
        // to use like this;
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>{poster.title}</h1>
                <p>{poster.caption}</p>
            </div>

            <div className={`${cn.contentContainer} lower-content-container`}>
                <div className={cn.imageContainer}>
                    {/* Unsplash source is here because @sam-cross cannot load posters off the local disk */}
                    <img src={picUrl || 'https://source.unsplash.com/random'} alt={poster.title} />
                    {log_status &&
                        <div className={`${cn.buttons}`}>
                            <ButtonAction
                                onClickHandler={handleClickAdmire}
                                activated={isAdmired}>
                                ❤
                            </ButtonAction>
                        </div>}
                </div>

                <div className={`${cn.informationContainer} information-container`}>
                    <h3>{poster.title}</h3>
                    <small>{`By ${poster.author}`}</small>

                    <div className={cn.admiresContainer}>
                        <span>❤</span>
                        <strong>{admires}</strong>
                    </div>

                    <div className={cn.viewsContainer}>
                        <span>👁️</span>
                        <strong>{poster.views}</strong>
                    </div>

                    <p>{poster.caption}</p>

                    <strong className={cn.price}>{poster.price.toFixed(2)}</strong>

                    <div className={`${cn.formContainer} form-container`}>
                        <form onSubmit={handleFormSubmit}>
                            <FormInput
                                type="number"
                                name="quantity"
                                value={addToCartQuantity}
                                onChange={(e) => setAddToCartQuantity(Number(e.target.value))} />
                            <button className="primary">
                                Add to Cart
                            </button>
                        </form>

                        {inCartQuantity === 0 &&
                            <small>Add to your cart to purchase</small>}
                        {inCartQuantity > 0 &&
                            <small>You have {inCartQuantity} of {poster.title} in your cart</small>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const FakePoster = () => {
    return (
        <div className={`${cn.container}`}>
            <div className={`${cn.previewContainer}`}>
                <a href={`/posters/all`}>
                    {/* // todo: make this a placeholder image, like a sad face or something */}
                    <img src={'https://source.unsplash.com/random/640x480'} alt={'Blank image'} />
                </a>
            </div>

            <div className={`${cn.caption}`}>
                <h2>Sorry!</h2>
                <small>No results found</small>
            </div>
        </div>
    );
};