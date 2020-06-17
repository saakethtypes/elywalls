import React, { useContext, useState, useEffect } from 'react';
import ImageUploader from "react-images-upload";
import { GlobalContext } from '../context/GlobalState';

import { FormInput, FormCheckboxInput, FormDropdownInput } from '../components/FormInput';

//@ts-ignore
import cn from './styles/PosterUpload.module.scss';

const MAX_IMAGE_SIZE = 15242880;
const INITIAL_PRICE = 160;

export const PosterUpload = () => {
  const { user, createPoster } = useContext(GlobalContext);

  const [pictures, setPictures] = useState();
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [price, setPrice] = useState(INITIAL_PRICE);
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [declaredOwnWork, setDeclaredOwnWork] = useState(false);

  const handleImageUpload = picture => {
    setPictures(picture);
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    if (
      pictures &&
      title &&
      caption &&
      price &&
      category &&
      tags
    ) {
      if (pictures[0].size > 200 && title.length > 0) {
        // todo: Check for current user before allowing poster upload
        createPoster({
          title,
          caption,
          price,
          madeBy: user.username,  
          category,
          tags
        }, pictures[0]);
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
        tags
      });
    }
  };
  return (
    <div className="page-container">

      <div className="page-heading">
        <h1 className="page-title">Upload Poster</h1>
        <p className="page-preface">Upload your artwork</p>
      </div>

      <ImageUploader
        withIcon={true}
        onChange={handleImageUpload}
        imgExtension={[".jpeg", ".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={MAX_IMAGE_SIZE}
      />

      <div className="form-container">
        <form onSubmit={handleFormSubmit}>
          <FormInput
            name="title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            autoComplete="off" />
          <FormInput
            name="caption"
            type="text"
            value={caption}
            onChange={e => setCaption(e.target.value)}
            autoComplete="off" />
          <FormInput
            name="price"
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
            inputProps={{
              step: "0.01",
              min: 0
            }} />
          <FormInput
            name="tags"
            type="text"
            value={tags}
            onChange={e => setTags(e.target.value)}
            autoComplete="off" />
          <FormDropdownInput
            name="category"
            value={category}
            options={[
              "Select Category",
              "Photoshop",
              "Photography",
              "Graphic",
              "Textography",
              "Other"
            ]}
            onChange={e => setCategory(e.target.value)} />

          {/* todo/fix: When checked state changes, the scroll of the page becomes bugged */}
          <FormCheckboxInput
            name="declaredOwnWork"
            displayName="This is my own work"
            checked={declaredOwnWork}
            onChange={e => setDeclaredOwnWork(e.target.checked)} />

          <button className="button-primary" type="submit">Publish</button>
        </form>

        <small>By publishing your work, you declare that the work and all contained elements are entirely your work.</small>
      </div>
    </div>
  );
};

