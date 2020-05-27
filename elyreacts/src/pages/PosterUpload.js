import React, { useContext,useState } from 'react'
import ImageUploader from "react-images-upload";
import { GlobalContext } from '../context/GlobalState';
export const PosterUpload = () => {

    const [pictures, setPictures] = useState();
    const {user,createPoster} = useContext(GlobalContext)
    const onDrop = picture => {
      setPictures(picture);  
    };
    const [title, settitle] = useState("")
    const [caption, setcaption] = useState("")
    const [price, setprice] = useState(170)
    const [category, setcategory] = useState("")
    const [tags, settags] = useState("")
    const publish = (e) => {
        e.preventDefault()
        let poster_data = {
            title: title,
            caption: caption,
            price: price,
            madeBy: user.name,
            category:category,
            tags:tags
          };
          if(pictures[0].size>200 && title.length>0){
              //todo rename file with tags,artist,title
          createPoster(poster_data,pictures[0])
          settitle("")
           setcaption("")
          setprice(170)
            setcategory("")
          settags("")
          setPictures();  

        }
    }
    return (
        <div>
            Upload
            <ImageUploader
      withIcon={true}
      onChange={onDrop}
      imgExtension={[".jpeg", ".jpg",".gif", ".png", ".gif"]}
      maxFileSize={15242880}
    />

        <form onSubmit={publish}>
        <div>
            <input
              value={title}
              type="text"
              placeholder="Title"
              onChange={e => settitle(e.target.value)}
            ></input>
          </div>
          <div>
            <input
              value={caption}
              placeholder="Caption"
              onChange={e => setcaption(e.target.value)}
              type="text"
            ></input>
          </div>
          <div>
            <input
              value={price}
              placeholder="Set Price"
              onChange={e => setprice(e.target.value)}
              type="number"
            ></input>
          </div>
          <div>
            <input
              value={tags}
              placeholder="Set Tags seperated by space"
              onChange={e => settags(e.target.value)}
              type="text"
            ></input>
          </div>
          {/* //TODO : List option of all categories (ps,graphic,photgraphy)  */}
          <div>
            <input
              value={category}
              placeholder="Category"
              onChange={e => setcategory(e.target.value)}
              type="text"
            ></input>
          </div>
          <button onClick={publish}>Publish Your Work</button>
          <p>I hereby declare by publishing that this work is my creative doing and not stolen</p>
        </form>
        </div>
    )
}

