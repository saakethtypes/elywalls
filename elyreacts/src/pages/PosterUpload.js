import React, { useContext, useState, useEffect } from "react";
import ImageUploader from "react-images-upload";
import { GlobalContext } from "../context/GlobalState";
import { Redirect } from "react-router-dom";

import LoadingIcon from "../components/LoadingIcon";

import { FormInput, FormCheckboxInput, FormDropdownInput } from "../components/FormInput";

//@ts-ignore
import cn from "./styles/PosterUpload.module.scss";

const MAX_IMAGE_SIZE = 15242880;
const INITIAL_PRICE = 160;

export const PosterUpload = (props) => {
    const { user, createPoster } = useContext(GlobalContext);

    const [pictures, setPictures] = useState();
    const [title, setTitle] = useState("");
    const [caption, setCaption] = useState("");
    const [price, setPrice] = useState(INITIAL_PRICE);
    const [tags, setTags] = useState("");
    const [category, setCategory] = useState("");
    const [artistDp, setartistDp] = useState("");
    const [declaredOwnWork, setDeclaredOwnWork] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handleImageUpload = (picture) => {
        setPictures(picture);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (pictures && title && caption && price && category && tags) {
            if (pictures[0].size > 200 && title.length > 0) {
                // todo: Check for current user before allowing poster upload
                createPoster(
                    {
                        title,
                        caption,
                        price,
                        madeBy: user.username,
                        category,
                        tags,
                        artistDp:user.dpURL,
                    },
                    pictures[0],
                    props
                );
                //return  <Redirect  to="/profile" />
            }
        } else {
            // todo: Notify user
            console.log("something was blank");
            console.dir({
                title,
                caption,
                price,
                madeBy: user.name,
                category,
                tags,
            });
        }
    };

    if (isLoading) return <LoadingIcon />;

    return (
        <div className='page-container'>
            <div className='page-header'>
                <h1 className='page-title'>Upload Poster</h1>
                <p className='page-preface'>Upload your artwork</p>
            </div>

            <div className='form-container'>
                <ImageUploader
                    withIcon={true}
                    onChange={handleImageUpload}
                    imgExtension={[".jpeg", ".jpg", ".gif", ".png", ".gif"]}
                    maxFileSize={MAX_IMAGE_SIZE}
                    singleImage={true}
                    label='Accepted .jpeg | .jpg | .png'
                    buttonText='Choose Poster'
                    withPreview={true}
                />

                <form onSubmit={handleFormSubmit}>
                    <FormInput
                        name='title'
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        autoComplete='off'
                    />
                    <FormInput
                        name='caption'
                        type='text'
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        autoComplete='off'
                    />
                    <FormInput
                        name='price'
                        type='number'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        inputProps={{
                            step: "0.01",
                            min: 0,
                        }}
                    />
                    <FormInput
                        name='tags'
                        type='text'
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        autoComplete='off'
                    />
                    <FormDropdownInput
                        name='category'
                        value={category}
                        options={[
                            "Select Category",
                            "Photoshop",
                            "Photography",
                            "Graphic",
                            "Textography",
                            "Other",
                        ]}
                        onChange={(e) => setCategory(e.target.value)}
                    />

                    {/* todo/fix: When checked state changes, the scroll of the page becomes bugged */}
                    <FormCheckboxInput
                        name='declaredOwnWork'
                        displayName='This is my own work'
                        checked={declaredOwnWork}
                        onChange={(e) => setDeclaredOwnWork(e.target.checked)}
                    />

                    <button className='button-primary' type='submit'>
                        Publish
                    </button>
                </form>

                <small>
                    By publishing your work, you declare that the work and all contained elements
                    are entirely your work.
                </small>
            </div>
        </div>
    );
};
