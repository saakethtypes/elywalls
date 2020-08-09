import { GlobalContext } from "../context/GlobalState";
import React, { useEffect, useContext, useState } from "react";
import { FormInput } from "../components/FormInput";
/*eslint-disable*/

// @ts-ignore \n /*eslint-disable*/
 /*eslint-disable*/

import cn from "./styles/PosterEdit.module.scss";


export const EditAccount = ({ aID ,props}) => {
    let { getArtist,updateCap,artist } = useContext(GlobalContext);

    useEffect(() => {
        getArtist(aID);
    }, []);

    let poster = {
        ...artist,
        id: (artist && artist._id) || aID,
        title: (artist && artist.name) || "Edit Name",
        caption: (artist && artist.quote) || "Edit Quote",
        tags: (artist && artist.linkedIG) || "Edit Instagram @",
    };

    const [title, setTitle] = useState(poster.title);
    const [caption, setCaption] = useState(poster.caption);
    const [tags, setTags] = useState(poster.tags);

    const handleFormSubmit = (e, formTitle, formCaption, formTags) => {
        e.preventDefault();

        setTitle(formTitle);
        setCaption(formCaption);

        updateCap( {
            formTitle,
            formCaption,
            formTags,
        },
        props);
    };


    return (
        <div className='page-container'>
            <div className='page-header'>
                <h1>{title}</h1>
                <p>{caption}</p>
                <p>@{tags}</p>
            </div>

            <div className={`${cn.contentContainer} lower-content-container`}>

                <div className='form-container'>
                    <form onSubmit={(e) => handleFormSubmit(e, title, caption, tags)}>
                        <FormInput
                            type='text'
                            name='Name'
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
                            name='Instagram @'
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                        />

                        <button type='submit'>Submit
                        </button>
                        </form>
                        {/* <button className={cn.buttonDelete} onClick={(e) => handleDeletePoster(e)}>
                            Delete Account
                        </button>
                    <small>Deleting your account is irreversible.</small> */}
                </div>
            </div>
        </div>
    );
};
