import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
import auth from "../auth";
let logUser = "placeholder for loggedUser"

try{
    logUser  = JSON.parse(localStorage.getItem('currentUser'))
}catch{
    localStorage.clear()
    sessionStorage.clear()
}
let ls = false;
console.log("dsfsdf",logUser)
let usercart = null;
let logArtist = null;
if (logUser) {
    if (logUser.user_type === 'artist') {
        logArtist = logUser;
        usercart = logUser.cart;
    }

    usercart = logUser.cart;
    ls = true;
}
else {
    logUser = null;
    ls = false;
    usercart = null;
}
const initialState = {
    posters: {
        error: null,
        isLoading: false,
        posters: []
    },
    user: logUser,
    cart: usercart,
    error: null,
    loading: null,
    poster: null,
    artists: null,
    log_status: ls,
    utype: null
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    async function registerUser(user) {
        try {
            const config = {
                headers: {
                    accept: 'application/json',
                },
                data: {},
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

    async function login(uname, pass, props) {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            console.log("hi")
            //TODO redirect to home page
            let usercred = { username: uname, password: pass };
            const res = await axios.post("/login", usercred, config);
            console.log(res.data)
            if (res.data.logged) {
                localStorage.setItem('currentUser', JSON.stringify(res.data.profile));
                localStorage.setItem("jwt", res.data.token,(err)=>console.log(err));
                console.log("object")

                dispatch({
                    type: "LOGIN",
                    logged_profile: res.data.profile
                });
                auth.login(() => {
                    props.history.push("/");
                });
            } else {
                //TODO notification of error in login
                console.log("yeah not logged in cuz", res.data.msg);
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
        localStorage.removeItem("currentUser");

        dispatch({
            type: "LOGOUT",
        });
    }

      
  async function persistLog(props) {
    const token = localStorage.getItem("jwt");
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    if (token) {
      const res = await axios.post("/verify",{"token":String(token)},config)
      let verified = res.data.veri
        if(!verified){
          localStorage.removeItem("jwt")
          localStorage.removeItem("currentUser");
        }else{
          auth.login(() => {
          props.history.push("/");
      });
        }
      }
  }


    async function editProfile(editted_profile) {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            await axios.post("/edit-profile", editted_profile, config);

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

    async function getPosters(category = 'all') {
        const getEndpoint = (category) => {
            switch (category) {
                case "all": return "/all";
                case "featured": return "/featured";
                case "textography": return "/textography";
                case "photoshop": return "/photoshop";
                case "graphic-design": return "/graphic-design";
                case "instafamous": return "/instafamous";
                case "popular": return "/popular";
                case "cart": return "/cart";

                default: return "/all";
            }
        };

        dispatch({
            type: "GET_POSTERS_STARTED"
        });

        try {
            const config = { headers: { "Content-type": "application/json" } };
            const res = await axios.get(
                getEndpoint(category),
                config
            );
              dispatch({
                type: "GET_POSTERS_SUCCEEDED",
                payload: res.data.posters
            });
        } catch (err) {
            console.log(err);
            dispatch({
                type: "GET_POSTERS_FAILED",
                payload: err.data
            });
        }
    };

    /*
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
                all_posters: res.data.posters.slice(0, 16)
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
*/

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
            dispatch({
                type: "ADMIRE_A",
            });
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
            dispatch({
                type: "UNADMIRE_A",
            });
        } catch (err) {
            dispatch({
                type: "ERROR",
                payload: err.data,
            });
        }
    }


    async function admirePoster(poster) {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "x-auth-token": localStorage.getItem("jwt")
                },
            };
        let res = await axios.patch(`/${poster._id}/admireP`, {x:0},config);
          console.log(res.data.user)

          dispatch({
            type: "ADMIRE_P",
            newadmire:poster
        });
        console.log("object")
        localStorage.setItem('currentUser',JSON.stringify(state.user))

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
            let res = await axios.patch(`/${pid}/unadmireP`,{s:0} ,config);
            console.log(res.data.user)
            dispatch({
                type: "UNADMIRE_P",
                unadmired:pid
            });
            localStorage.setItem('currentUser',JSON.stringify(state.user))

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

    async function addToCart(poster) {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "x-auth-token": localStorage.getItem("jwt")
                },
            };

            let x = { "s": 0 };
            const res = await axios.patch(`cartadd/${poster._id}`, x, config);
            dispatch({
                type: "ADD_TO_CART",
                cart: res.data.cartObj[0]
            });
            localStorage.setItem('currentUser',JSON.stringify(state.user))


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
            let res = await axios.delete(`cartdelete/${cid}`, config);

            dispatch({
                type: "DELETE_FROM_CART",
                item_removed: cid
            });
            localStorage.setItem('currentUser',JSON.stringify(state.user))
            console.log("sssssremoved")

        } catch (err) {
            dispatch({
                type: "ERROR",
                payload: err.data,
            });
        }
    }


    async function createPoster(new_poster,picture) {
        try {

            const formData = new FormData();
            formData.append('posterImg',picture,String(new_poster.title)+
            String(new_poster.tags));
            formData.append('title',new_poster.title);
            formData.append('caption',new_poster.caption);
            formData.append('price',new_poster.price);
            formData.append('tags',new_poster.tags);
            formData.append('madeBy',new_poster.madeBy);
            formData.append('category',new_poster.category);

            const config = {

                headers: {
                    "x-auth-token": localStorage.getItem("jwt")                },
            };
            console.log(picture)
            const res = await axios.post('/publish-poster',formData,config);
            console.log("doneuploaded broo")
            console.log(res.data.poster_created)
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

    async function getProfileUser() {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": localStorage.getItem("jwt")
                },
            };
            const res = await axios.get('/account', config);

            dispatch({
                type: "PROFILE_B",
                profile: res.data.profile
            });

        } catch (err) {
            dispatch({
                type: "ERROR",
                payload: err.data,
            });
        }
    }

    async function getProfileArtist() {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "x-auth-token": localStorage.getItem("jwt")
                },
            };
            const res = await axios.get('/profile', config);

            dispatch({
                type: "PROFILE_A",
                poster_created: res.data.profile
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
                poster: state.poster,
                artist: state.artist,
                artists: state.artists,
                log_status: state.log_status,
                login,
                logout,
                persistLog,
                registerUser,
                registerArtist,
                editProfile,
                getProfileArtist,
                getProfileUser,
                getPosters,
                // getPostersAll,
                // getPostersGraphic,
                // getPostersPhotoshop,
                // getPostersPhotography,
                // getPostersTextography,
                // getPostersInstafamous,
                // //getPostersLatest,
                // getPostersPopular,
                // getPostersFeatured,
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
