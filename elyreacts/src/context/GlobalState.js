import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
import auth from "../auth";

const initialState = {
  posters: [],
  user: null,
  cart: null,
  error: null,
  loading: null,
  poster:null,
  artist:null,
  artists:null,
  log_status:null,
  utype:null
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);


  async function registerUser(user) {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      await axios.post("/register-buyer", user, config);
      //TODO redirect to login page
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.data,
      });
    }
  }


  async function registerArtist(artist) {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      await axios.post("/register-artist", artist, config);
      //TODO redirect to login page
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.data,
      });
    }
  }

  async function login(uname,pass,props) {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      //TODO redirect to home page
      let usercred = { username: uname, password: pass };
      const res = await axios.post("/login",usercred,config);
      if(res.data.logged){
      localStorage.setItem("jwt", res.data.token);
      console.log("dasa",res)

      dispatch({
        type: "LOGIN",
        user_profile: res.data
      });
      auth.login(() => {
        props.history.push("/");
      });
    }else{
      //TODO notification of error in login
       console.log("yeah not logged in cuz",res.data.msg)
    }
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.data,
      });
    }
  }


  async function logout() {
    localStorage.removeItem("jwt");
    dispatch({
      type: "LOGOUT",
    });
  }


  async function editProfile(editted_profile) {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      await axios.post("/edit-profile", editted_profile,config);
    
      dispatch({
        type: "EDIT_PROFILE",
        editted_user: editted_profile
      });

    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.data,
      });
    }
  }


  async function getPostersAll() {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const res = await axios.get("/all", config);
      dispatch({
        type: "ALL_POSTERS",
        all_posters: res.data.posters.slice(0, 16)         /* todo: .slice is temp */
      });

    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.data,
      });
    }
  }


  async function getPostersFeatured() {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const res = await axios.get("/featured", config);

      dispatch({
        type: "FEATURED_POSTERS",
        featured: res.data.posters
      });

    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.data,
      });
    }
  }


  async function getPostersTextography() {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const res = await axios.get("/textography", config);

      dispatch({
        type: "TEXTOGRAPHY_POSTERS",
        textography: res.data.posters
      });

    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.data,
      });
    }
  }


  async function getPostersPhotoshop() {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const res = await axios.get("/photoshop", config);

      dispatch({
        type: "PHOTOSHOP_POSTERS",
        photoshop: res.data.posters
      });

    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.data,
      });
    }
  }


  async function getPostersPhotography() {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const res = await axios.get("/featured", config);

      dispatch({
        type: "PHOTOGRAPHY_POSTERS",
        photography: res.data.posters
      });

    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.data,
      });
    }
  }


  async function getPostersGraphic() {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const res = await axios.get("/graphic-design", config);

      dispatch({
        type: "GRAPHIC_POSTERS",
        graphic: res.data.posters
      });

    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.data,
      });
    }
  }


  async function getPostersInstafamous() {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const res = await axios.get("/instafamous", config);

      dispatch({
        type: "INSTAFAMOUS_POSTERS",
        instafamous: res.data.posters
      });

    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.data,
      });
    }
  }


  async function getPostersPopular() {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const res = await axios.get("/popular", config);

      dispatch({
        type: "POPULAR_POSTERS",
        popular: res.data.posters
      });

    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.data,
      });
    }
  }


  async function getAdmiredPosters() {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "x-auth-token": localStorage.getItem("jwt")
        },
      };
      const res = await axios.get("/admired-posters", config);

      dispatch({
        type: "ADMIRED_POSTERS",
        user_admiredP: res.data.posters
      });

    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.data,
      });
    }
  }


  async function getAdmiredArtists() {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "x-auth-token": localStorage.getItem("jwt")
        },
      };
      const res = await axios.get("/admired-artists", config);

      dispatch({
        type: "ADMIRED_ARTISTS",
        user_admiredA: res.data.posters
      });

    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.data,
      });
    }
  }


  async function getPoster(pid) {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const res = await axios.get(`/poster/${pid}`, config);

      dispatch({
        type: "POSTER_SPECIFIC",
        poster: res.data.poster
      });

    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.data,
      });
    }
  }


  async function getArtist(auname) {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const res = await axios.get(`/${auname}`, config);

      dispatch({
        type: "ARTIST_PROFILE",
        artist: res.data.artist
      });

    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.data,
      });
    }
  }


  async function admireArtist(aid) {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "x-auth-token": localStorage.getItem("jwt")
        },
      };
      await axios.get(`/${aid}/admireA`, config);

    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.data,
      });
    }
  }


  async function unadmireArtist(aid) {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "x-auth-token": localStorage.getItem("jwt")
        },
      };
      await axios.get(`/${aid}/unadmireA`, config);

    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.data,
      });
    }
  }


  async function admirePoster(pid) {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "x-auth-token": localStorage.getItem("jwt")
        },
      };
      await axios.get(`/${pid}/admireP`, config);

    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.data,
      });
    }
  }


  async function unadmirePoster(pid) {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "x-auth-token": localStorage.getItem("jwt")
        },
      };
      await axios.get(`/${pid}/unadmireP`, config);

    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.data,
      });
    }
  }


  async function deletePoster(pid) {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "x-auth-token": localStorage.getItem("jwt")
        },
      };
      await axios.delete(`poster/${pid}`, config);

    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.data,
      });
    }
  }


  async function editPoster(pid, editted_poster) {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "x-auth-token": localStorage.getItem("jwt")
        },
      };
      await axios.put(`poster/${pid}`, config, editted_poster);
      dispatch({
        type: "EDIT_POSTER",
        editted_poster: editted_poster
      });
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.data,
      });
    }
  }


  async function addToCart(pid) {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "x-auth-token": localStorage.getItem("jwt")
        },
      };
      const res = await axios.patch(`cart/${pid}`, config);

      dispatch({
        type: "ADD_TO_CART",
        cart: res.data.posters
      });

    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.data,
      });
    }
  }


  async function removeFromCart(cid) {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "x-auth-token": localStorage.getItem("jwt")
        },
      };
      await axios.delete(`cart/${cid}`, config);

      dispatch({
        type: "DELETE_FROM_CART",
        item_removed: cid
      });

    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.data,
      });
    }
  }


  async function createPoster(new_poster) {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "x-auth-token": localStorage.getItem("jwt")
        },
      };
      const res = await axios.post('publish-poster/', config, new_poster);

      dispatch({
        type: "CREATE_POSTER",
        poster_created: res.data.poster_created
      });

    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.data,
      });
    }
  }


  return (
    <GlobalContext.Provider
      value={{
        posters: state.posters,
        user: state.user,
        cart: state.cart,
        error: state.error,
        loading: state.loading,
        poster:state.poster,
        artist:state.artist,
        artists:state.artists,
        log_status:state.log_status,
       login,
       logout,
       registerUser,
       registerArtist,
       editProfile,
       getPostersAll,
       getPostersGraphic,
       getPostersPhotoshop,
       getPostersPhotography,
       getPostersTextography,
       getPostersInstafamous,
       //getPostersLatest,
       getPostersPopular,
       getPostersFeatured,
       getArtist,
       getPoster,
       createPoster,
       deletePoster,
       editPoster,
       admirePoster,
       unadmirePoster,
       admireArtist,
       unadmireArtist,
       addToCart,
       removeFromCart,
       getAdmiredPosters,
       getAdmiredArtists
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
