import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext, useState } from "react";
import { FormInput } from "../components/FormInput";

// @ts-ignore
import cn from "./styles/PosterEdit.module.scss";

const getPictureUrl = (pictureUrl) => {
    try {
        return require("../assets/postersDb/" + pictureUrl.split("Db")[1].substring(1));
    } catch (err) {
        // todo/fixme: Remove this as it shouldn't be necessary outside of testing
        return "https://source.unsplash.com/random";
    }
};

export const PosterEdit = ({ posterID }) => {
    let { getPoster, poster, editPoster, deletePoster } = useContext(GlobalContext);

    useEffect(() => {
        getPoster(posterID);
    }, []);

    poster = {
        ...poster,
        id: (poster && poster._id) || posterID,
        title: (poster && poster.title) || "Edit Title",
        author: (poster && poster.madeBy) || "Unknown",
        category: (poster && poster.category) || "Unknown",
        caption: (poster && poster.caption) || "Edit Caption",
        price: (poster && poster.price) || 0.0,
        views: (poster && poster.views) || 0,
        admires: (poster && poster.admires) || 0,
        tags: (poster && poster.tags) || "Edit Tags",
    };

    const [title, setTitle] = useState(poster.title);
    const [caption, setCaption] = useState(poster.caption);
    const [tags, setTags] = useState(poster.tags);

    const handleFormSubmit = (e, formTitle, formCaption, formTags) => {
        e.preventDefault();

        setTitle(formTitle);
        setCaption(formCaption);

        editPoster(poster.id, {
            formTitle,
            formCaption,
            formTags,
        });
    };

    const handleDeletePoster = (e) => {
        e.preventDefault();
        deletePoster(posterID);
    };

    return (
        <div className='page-container'>
            <div className='page-header'>
                <h1>Edit Poster</h1>
                <p>Editing poster: {title}</p>
            </div>

            <div className={`${cn.contentContainer} lower-content-container`}>
                <div className={cn.imageContainer}>
                    <img src={getPictureUrl(poster.pictureURL)} alt={poster.title} />
                </div>

                <div className='form-container'>
                    <form onSubmit={(e) => handleFormSubmit(e, title, caption, tags)}>
                        <FormInput
                            type='text'
                            name='Title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <FormInput
                            type='text'
                            name='Caption'
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                        />
                        <FormInput
                            type='text'
                            name='tags'
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                        />
                        <button type='submit'>Submit</button>
                        <button className={cn.buttonDelete} onClick={(e) => handleDeletePoster(e)}>
                            Delete Poster
                        </button>
                    </form>

                    <small>Deleting a poster is irreversible.</small>
                </div>
            </div>
        </div>
    );
};
