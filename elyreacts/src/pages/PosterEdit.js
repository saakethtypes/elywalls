import {GlobalContext} from "../context/GlobalState";
import React, {useEffect, useContext, useState} from "react";
// @ts-ignore
import cn from './styles/Poster.module.scss';
import {FormInput} from "../components/FormInput";

export const PosterEdit = ({
    posterID
}) => {
    let {
        user,
        log_status,
        getPoster,
        poster,
        editPoster,
        deletePoster
    } = useContext(GlobalContext);

    console.log(posterID);
    useEffect(() => {
        
        getPoster(posterID);
    }, []);

    let picUrl = null;
    try {
        let purl = poster.pictureURL.split('Db\\')[1];
        picUrl = require("../assets/postersDb/" + purl);
    } catch{let x = 0;}

    poster = {
        ...poster,
        id: poster && poster._id || posterID,
        title: poster && poster.title || 'Untitled',
        author: poster && poster.madeBy || 'Unknown',
        category: poster && poster.category || 'Unknown',
        caption: poster && poster.caption|| "Caption",
        price: poster && poster.price || 0.0,
        views: poster && poster.views || 0,
        admires: poster && poster.admires || 0,
        tags: poster && poster.tags || 'Unknown'
    };

    console.log(poster.title);
    let ti = poster.title
    console.log(ti)
    const [title, setTitle] = useState(ti);
    const [caption, setCaption] = useState(poster.caption) 
    const [tags, setTags] = useState(poster.tags);
    const handleFormSubmit = (e, title, caption, tags) => {
        let edittedForm = {
            title: title,
            caption: caption,
            tags: tags
        };
        e.preventDefault();
        setTitle(title);
        setCaption(caption);
        editPoster(poster.id, edittedForm);
    };

    const handleDeletePoster = (e) => {
        e.preventDefault();
        console.log("deletign ")
        deletePoster(posterID);
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>{title}</h1>
                <p>{caption}</p>
            </div>

            <div className={`${cn.contentContainer} lower-content-container`}>
                <div className={cn.imageContainer}>
                    {picUrl !== null ? <img src={picUrl} alt={poster.title} />
                        : <img src={picUrl} alt={poster.title} />
                    }

                </div>

                <div className={`${cn.informationContainer}`}>

                    <small>{`By ${poster.author}`}</small>
                    <div className={cn.admiresContainer}>
                        <span>❤</span>
                        <strong>{poster.admires}</strong>
                    </div>

                    <div className={cn.viewsContainer}>
                        <span>👁️</span>
                        <strong>{poster.views}</strong>
                    </div>

                    <form onSubmit={e => handleFormSubmit(e, title, caption, tags)}>
                        <FormInput
                            type="text"
                            name="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} />
                        <FormInput
                            type="text"
                            name="Caption"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)} />
                        <FormInput
                            type="text"
                            name="tags"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)} />
                        <button>Submit edits</button>
                    </form>
                    <button onClick={(e)=>handleDeletePoster(e)}>Delete poster</button>
                    <h6>If you delete the poster you will not be able to
                        make any profits from it.</h6>
                    <strong className={cn.price}>{poster.price.toFixed(2)}</strong>
                    <h4>You can not edit the poster price.</h4>
                    <div className={`${cn.formContainer} form-container`}>
                    </div>
                </div>
            </div>
        </div>
    );
};