import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
import auth from "../auth";
/* eslint-disable*/

import { v4 } from "uuid";
import { store } from "react-notifications-component";
import 'react-notifications-component/dist/theme.css'
let logUser = JSON.parse(localStorage.getItem("currentUser") || null);
let ls = false;
let usercart = null;
let logArtist = null;
let useradmired = null;
let userorders = null;

if (logUser) {
    if (logUser.user_type === "artist") {
        logArtist = logUser;
        usercart = logUser.cart;
        useradmired = logUser.admires || [];
        userorders = logUser.bought_posters || []
    } else {
        usercart = logUser.cart;
        useradmired = logUser.admires || [];
        userorders = logUser.bought_posters || []
    }

    ls = true;
} else {
    logUser = null;
    ls = false;
    usercart = null;
    useradmired = null;
    userorders = null
}
const initialState = {
    posters: {
        error: null,
        isLoading: false,
        posters: [],
    },
    user: logUser,
    cart: usercart,
    error: null,
    loading: null,
    poster: null,
    artists: null,
    log_status: ls,
    utype: null,
    artist:null,
    recommends: null,
    total: 0,
    admires: useradmired,
    order:0,
    orders:userorders,
    loadLimit:40,
    goAhead:true,
    heros:{heros:[
        "welcome",
        "welcome1",
        "welcome2",
        "welcome3",
        "welcome4",
    ]}
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    async function registerUser(user) {
        try {
            const config = {
                headers: {
                    accept: "application/json",
                },
                data: {},
            };
            const res = await axios.post("/register-buyer", user, config);
            if(res.data.err==true){
             store.addNotification({
                title: `Sorry! Someone else was first`,
                message: `Pick a different username`,
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                  duration: 4000,
                  onScreen: true,
                },
              });}else{
                await store.addNotification({
                    title: `Start styling your walls once you verify!`,
                    message: `We've sent you an email`,
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                      duration: 4000,
                      onScreen: true,
                    },
                  });
              }
        } catch (err) {
            dispatch({
                type: "ERROR",
                payload: err.data,
            });
        }
    }

    async function registerArtist(artist,dp) {
        try {
            const formData = new FormData();
            formData.append(
                "artistDp",
                dp,
                String(artist.name) + String(artist.igLink)
            );
            formData.append("name", artist.name);
            formData.append("linkedIg", artist.igLink);
            formData.append("email", artist.email);
            formData.append("password", artist.password);
            formData.append("phone", artist.phone);
            formData.append("username", artist.username);
            const config = {
                headers: {
                    "x-auth-token": localStorage.getItem("jwt"),
                },
            };
            const res = await axios.post("/register-artist", formData, config);
            if(res.data.err==true){
                store.addNotification({
                   title: `Sorry! Someone else was first`,
                   message: `Pick a different username or email`,
                   type: "danger",
                   insert: "top",
                   container: "top-right",
                   animationIn: ["animated", "fadeIn"],
                   animationOut: ["animated", "fadeOut"],
                   dismiss: {
                     duration: 4000,
                     onScreen: true,
                   },
                 });}else{
                   await store.addNotification({
                       title: `Start styling your walls once you verify!`,
                       message: `We've sent you an email`,
                       type: "success",
                       insert: "top",
                       container: "top-right",
                       animationIn: ["animated", "fadeIn"],
                       animationOut: ["animated", "fadeOut"],
                       dismiss: {
                         duration: 4000,
                         onScreen: true,
                       },
                     });
                 }
        
        } catch (err) {
            console.log(err)
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
            let usercred = { username: uname, password: pass };
            const res = await axios.post("/login", usercred, config);

            if (res.data.logged) {
                localStorage.setItem("currentUser", JSON.stringify(res.data.profile));
                localStorage.setItem("jwt", res.data.token);

                dispatch({
                    type: "LOGIN",
                    logged_profile: res.data.profile,
                });
                auth.login(() => {
                    props.history.push("/");
                });
                await store.addNotification({
                    title: `Hey ${res.data.profile.name}! 👋`,
                    message: `Welcome back! Continue styling your walls`,
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                      duration: 4000,
                      onScreen: true,
                    },
                  });
                console.log("logged in ");
            } else {
               await store.addNotification({
                    title: "Login Failed",
                    message: `${res.data.msg}`,
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                      duration: 3000,
                      onScreen: true,
                    },
                  });

                }
        } catch (err) {
            dispatch({
                type: "ERROR",
                payload: err.data,
            });
        }
    }

    async function logout() {
        console.log("logout");
        localStorage.removeItem("jwt");
        localStorage.removeItem("currentUser");
        await store.addNotification({
            title: `Come back soon! 👋`,
            message: `Logged out`,
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 3000,
              onScreen: true,
            },
          });
        dispatch({
            type: "LOGOUT",
        });
    }

    async function forgotPass(email) {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            let token = v4();
            console.log("reseting password")
            await store.addNotification({
                title: `Hey! Check your Inbox`,
                message: `We've sent you a mail`,
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                  duration: 3000,
                  onScreen: true,
                },
              });
            await axios.post(`/forgot-password`, { email: email, id: token }, config);
        } catch (err) {
            console.log(err)
            dispatch({
                type: "ERROR",
                payload: err.data,
            });
        }
    }

    async function resetPass(password, id) {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const res = await axios.post(`/reset-password/`, { password: password, id: id }, config);
            await store.addNotification({
                title: `Password Updated.`,
                message: `You can now log back in.`,
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                  duration: 3000,
                  onScreen: true,
                },
              });
        } catch (err) {
            dispatch({
                type: "ERROR",
                payload: err.data,
            });
        }
    }

    async function persistLog(props) {
        const token = localStorage.getItem("jwt");
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        if (token) {
            const res = await axios.post("/verify", { token: String(token) }, config);
            let verified = res.data.veri;
            if (!verified) {
                localStorage.removeItem("jwt");
                localStorage.removeItem("currentUser");
            } else {
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
            await store.addNotification({
                title: `Updated your profile`,
                message: ":)",
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                  duration: 3000,
                  onScreen: true,
                },
              });
            dispatch({
                type: "EDIT_PROFILE",
                editted_user: editted_profile,
            });
        } catch (err) {
            dispatch({
                type: "ERROR",
                payload: err.data,
            });
        }
    }

    const getEndpoint = (category,infiPage) => {
        console.log("hu")

switch (category) {
    case "all":
        console.log(infiPage)
        return `/all?infiPage=${infiPage}`;
    case "latest":
        return "/latest";
    case "textography":
        return `/textography?infiPage=${infiPage}`;
    case "photoshop":
        return `/photoshop?infiPage=${infiPage}`;
    case "photography":
        return `/photography?infiPage=${infiPage}`;
    case "graphic-design":
        return `/graphic-design?infiPage=${infiPage}`;
    case "popular":
        return "/popular";
    case "admires":
        return "/nonexistent";
    default:
        return "all";
}
};

    async function getPosters(category = "all",infiPage) {
        

        dispatch({
            type: "GET_POSTERS_STARTED",
        });

        try {
            const config = {
                headers: { "Content-type": "Application/json" },
            };
            const res = await axios.get(getEndpoint(category,infiPage+10), config).catch((err) => {
                console.log(err);
            });
            console.log(res.data)
            dispatch({
                type: "GET_POSTERS_SUCCEEDED",
                payload: res.data.posters,

                lengthLimit: res.data.AllLength||state.loadLimit
            });
        } catch (err) {
            console.log(err);
            dispatch({
                type: "GET_POSTERS_FAILED",
                payload: err.data,
            });
        }
    }

    async function getPostersMore(category = "all",infiPage) {
        try {
            await store.addNotification({
                title: `Fetching more art ...`,
                message: `Haven't you found The One yet?`,
                type: "info",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                  duration: 3000,
                  onScreen: true,
                },
              });
            const config = {
                headers: { "Content-type": "Application/json" },
            };
            const res = await axios.get(getEndpoint(category,infiPage), config).catch((err) => {
                console.log(err);
            });
            var postersUnique = res.data.posters.filter(
                function(item, index){
                return res.data.posters.indexOf(item) >= index;
            });

            dispatch({
                type: "GET_POSTERS_MORE",
                payload: postersUnique,
                goAhead: res.data.go,
            });

        } catch (err) {
            dispatch({
                type: "ERROR",
                payload: err.data,
            });
        }
    }

    async function getCart() {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "x-auth-token": localStorage.getItem("jwt"),
                },
            };

            let ress = await axios.get("/cart", config).catch((err) => {
            });
            let total = 0;
            ress.data.cartitems.map((ci) => {
                total = total + Number(ci.price_with_quantity);
            });
            dispatch({
                type: "CART_GET",
                cartItems: ress.data.cartitems,
                total: total,
            });

            localStorage.setItem("currentUser", JSON.stringify(state.user));
        } catch (err) {
            dispatch({
                type: "ERROR",
                payload: err.data,
            });
        }
    }

    async function getOrders() {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "x-auth-token": localStorage.getItem("jwt"),
                },
            };

            let ress = await axios.get("/orders", config).catch((err) => {
            });
            dispatch({
                type: "ORDER_GET",
                orders: ress.data.orders
            });

            localStorage.setItem("currentUser", JSON.stringify(state.user));
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
                    "x-auth-token": localStorage.getItem("jwt"),
                },
            };

            let ress = await axios.get("/admired-posters", config);

            dispatch({
                type: "GET_ADMIRED_POSTERS",
                admires: ress.data.posters,
            });

            localStorage.setItem("currentUser", JSON.stringify(state.user));
        } catch (err) {
            dispatch({
                type: "ERROR",
                payload: err.data,
            });
        }
    }

    async function getRecommends(cat, aid, pid) {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "x-auth-token": localStorage.getItem("jwt"),
                },
            };
            
            let ress = await axios.get(`/recommends/${cat}/${aid}/${pid}`, config);

            dispatch({
                type: "RECOMMENDS",
                recommends: ress.data.recommends,
            });

            localStorage.setItem("currentUser", JSON.stringify(state.user));
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
                    "x-auth-token": localStorage.getItem("jwt"),
                },
            };
            const res = await axios.get("/admired-artists", config);

            dispatch({
                type: "ADMIRED_ARTISTS",
                user_admiredA: res.data.posters,
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
                type: "POSTER_SINGLE",
                poster: res.data.poster,
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
            const res = await axios.get(`/profile/${auname}`, config);
            
            dispatch({
                type: "ARTIST_PROFILE",
                artist: res.data.artist[0],
            });
        } catch (err) {
            dispatch({
                type: "ERROR",
                payload: err.data,
            });
        }
    }

    async function getTopArtists() {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const res = await axios.get(`/topartists`, config);
            dispatch({
                type: "TOP_ARTISTS",
                artists: res.data.artists,
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
                    "x-auth-token": localStorage.getItem("jwt"),
                },
            };
            await axios.get(`/${aid}/admireA`, config);
            await store.addNotification({
                title: `Added to your favorites 💜 `,
                message: `Collection available in your account`,
                type: "info",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                  duration: 3000,
                  onScreen: true,
                },
              });
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
                    "x-auth-token": localStorage.getItem("jwt"),
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

    async function deletePoster(pid,props) {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "x-auth-token": localStorage.getItem("jwt"),
                },
            };
            const res = await axios.delete(`/poster/${pid}`, config);
            await store.addNotification({
                title: `Deleted your art 💔 `,
                message: `You won't be able to make any profits off of it anymore`,
                type: "info",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                  duration: 3000,
                  onScreen: true,
                },
              });
            return props.history.push(`/profile/${state.user.username}`);
        } catch (err) {
            dispatch({
                type: "ERROR",
                payload: err.data,
            });
        }
    }

    

    async function editPoster(pid, editted_poster,props) {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "x-auth-token": localStorage.getItem("jwt"),
                },
            };
            await axios.patch(`/poster-edit/${pid}`, editted_poster, config);
            await store.addNotification({
                title: `Editted your poster`,
                message: `New idea?`,
               type: "info",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                  duration: 3000,
                  onScreen: true,
                },
              });
            dispatch({
                type: "EDIT_POSTER",
                editted_poster: editted_poster,
            });
            return props.history.push(`/poster/${pid}`);

        } catch (err) {
            dispatch({
                type: "ERROR",
                payload: err.data,
            });
        }
    }

    async function addToCart(pid,pname) {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "x-auth-token": localStorage.getItem("jwt"),
                },
            };

            let x = { s: 0 };
            const res = await axios.patch(`/cartadd/${pid}`, x, config);
            
            if (res.data.err) {
                localStorage.removeItem("jwt");
                localStorage.removeItem("currentUser");
            } else {
                dispatch({
                    type: "ADD_TO_CART",
                    cart: res.data.cartObj[0],
                });
            }
            
            localStorage.setItem("currentUser", JSON.stringify(state.user));
        } catch (err) {
            dispatch({
                type: "ERROR",
                payload: err.data,
            });
        }
    }

    async function setCartItemQuantity(cid, q, p) {
        const config = {
            headers: {
                "Content-type": "application/json",
                "x-auth-token": localStorage.getItem("jwt"),
            },
        };
        try {
            await axios.patch(`saveQuantity/${cid}`, { q: q, pwq: p }, config);

            dispatch({
                type: "CART_QUANTITY",
                ci: cid,
                quantity: q,
                poster_price: p,
            });
            localStorage.setItem("currentUser", JSON.stringify(state.user));
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
                    "x-auth-token": localStorage.getItem("jwt"),
                },
            };
            await axios.delete(`/cartdelete/${cid}`, config);
            await store.addNotification({
                title: `Item has been removed from your cart`,
                message: `:(`,
                type: "info",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                  duration: 3000,
                  onScreen: true,
                },
              });
            dispatch({
                type: "DELETE_FROM_CART",
                item_removed: cid,
            });
            localStorage.setItem("currentUser", JSON.stringify(state.user));
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
                    "x-auth-token": localStorage.getItem("jwt"),
                },
            };
            let res = await axios.patch(`/admireP/${poster._id}/`, { x: 0 }, config);
            await store.addNotification({
                title: `Added to your favorites 💜 `,
                message: `Collection available in your account`,
                type: "info",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                  duration: 3000,
                  onScreen: true,
                },
              });
            if (res.data.err) {
                localStorage.removeItem("jwt");
                localStorage.removeItem("currentUser");
                await store.addNotification({
                    title: `You need to login again to make any action `,
                    message: `Token Expired`,
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                      duration: 3000,
                      onScreen: true,
                    },
                  });
            } else {
                dispatch({
                    type: "ADMIRE_P",
                    newadmire: poster,
                });
                localStorage.setItem("currentUser", JSON.stringify(state.user));
            }
        } catch (err) {
            dispatch({
                type: "ERROR",
                payload: err.data,
            });
        }
    }

    async function unadmirePoster(poster) {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "x-auth-token": localStorage.getItem("jwt"),
                },
            };
            let res = await axios.patch(`/unadmireP/${poster._id}/`, { s: 0 }, config);
            await store.addNotification({
                title: `Removed from your favorites 💔 `,
                message: `Collection available in your account`,
                type: "info",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                  duration: 3000,
                  onScreen: true,
                },
              });
            if (res.data.err) {

                localStorage.removeItem("jwt");
                localStorage.removeItem("currentUser");
                await store.addNotification({
                    title: `You need to login again to make any action `,
                    message: `Token Expired`,
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                      duration: 3000,
                      onScreen: true,
                    },
                  });
            } else {

                dispatch({
                    type: "UNADMIRE_P",
                    unadmired: poster,
                });
                localStorage.setItem("currentUser", JSON.stringify(state.user));
            }
        } catch (err) {
            dispatch({
                type: "ERROR",
                payload: err.data,
            });
        }
    }

    async function createPoster(new_poster, picture,props) {
        try {
            const formData = new FormData();
            formData.append(
                "posterImg",
                picture,
                String(new_poster.title) + String(new_poster.tags)
            );
            formData.append("title", new_poster.title);
            formData.append("caption", new_poster.caption);
            formData.append("price", new_poster.price);
            formData.append("tags", new_poster.tags);
            formData.append("madeBy", new_poster.madeBy);
            formData.append("category", new_poster.category);
            formData.append("artistDp", new_poster.artistDp);
            const config = {
                headers: {
                    "x-auth-token": localStorage.getItem("jwt"),
                },
            };
            const res = await axios.post("/publish-poster", formData, config);

            dispatch({
                type: "CREATE_POSTER",
                poster_created: res.data.poster_created,
            });
                await store.addNotification({
                    title: `${new_poster.title} is now published and ready to be sold`,
                    message: `YAY!`,
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                      duration: 3000,
                      onScreen: true,
                    },
                  });
            return props.history.push(`/profile/${state.user.username}`);
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
                    "x-auth-token": localStorage.getItem("jwt"),
                },
            };
            const res = await axios.get("/account", config);
            dispatch({
                type: "PROFILE_B",
                profile: res.data.profile,
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
                    "x-auth-token": localStorage.getItem("jwt"),
                },
            };

            const res = await axios.get(`/youraccount`, config);
            dispatch({
                type: "PROFILE_A",
                posters_made: res.data.profile.postersmade.reverse(),
            });
        } catch (err) {
            dispatch({
                type: "ERROR",
                payload: err.data,
            });
        }
    }


    async function getOrder(oid) {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": localStorage.getItem("jwt"),
                },
            };
            const res = await axios.get(`/order/${oid}`, config);
            dispatch({
                type: "ORDER_SINGLE_GET",
                order: res.data.order,
            });
        } catch (err) {
            dispatch({
                type: "ERROR",
                payload: err.data,
            });
        }
    }

    async function getSales(aid) {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": localStorage.getItem("jwt"),
                },
            };
            const res = await axios.get(`/sales/${aid}`, config);
            dispatch({
                type: "SALES_GET",
                salesPosters: res.data.postersales,
            });
            localStorage.setItem("currentUser", JSON.stringify(state.user));

        } catch (err) {
            dispatch({
                type: "ERROR",
                payload: err.data,
            });
        }
    }

    // async function getHeros() {
    //     try {
    //         const config = {
    //             headers: {
    //                 "Content-type": "application/json",
    //             },
    //         };
    //         const res = await axios.get(`/heros`, config);
    //         dispatch({
    //             type: "HEROS",
    //             heros:res.data
    //         });
    //     } catch (err) {
    //         dispatch({
    //             type: "ERROR",
    //             payload: err.data,
    //         });
    //     }
    // }

    async function confirmAcc(utype,token,props) {
        try {
            const config = {
                headers: {

                    "Content-type": "application/json",
                    
                },
            };
            const res = await axios.get(`/confirmation/${utype}/${token}`, config);
            if(res.data.success){
               return props.history.push('/confirmed')
            }else{
                return props.history.push('/')
            }
        } catch (err) {
            dispatch({
                type: "ERROR",
                payload: err.data,
            });
        }
    }

    async function updateCap(editted_cap,props) {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "x-auth-token": localStorage.getItem("jwt"),

                },
            };
            await axios.post(`/update-quote`, {"quote":editted_cap}, config);
            await store.addNotification({
                title: `Updated your Quote`,
                message: "People always love to know what drives the artist",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                  duration: 3000,
                  onScreen: true,
                },
              });
            dispatch({
                type: "EDIT_CAP",
                editted_user: editted_cap,
            });
            return props.history.push(`/`)
        } catch (err) {
            dispatch({
                type: "ERROR",
                payload: err.data,
            });
        }
    }
    async function refreshToken() {
        if(state.user  != null){
          const config = {
            headers: {
              "Content-type": "application/json",
              "x-auth-token": localStorage.getItem("jwt"),
            },
          }; 

          let res = await axios.get(`/get-token/${state.user.username}/${state.user.user_type}`,config)
          localStorage.setItem('jwt',res.data.token)
          localStorage.setItem('currentUser',JSON.stringify(res.data.user))

        }
      }

    async function pay(body,props) {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "x-auth-token": localStorage.getItem("jwt"),
                },
            };
            const res = await axios.post(`/pay`, body, config);
            if(res.data.success){
            await store.addNotification({
                title: `Payment successfull!`,
                message: `YAY! ✋ *clap* `,
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                  duration: 3000,
                  onScreen: true,
                },
              });}
            dispatch({
                type: "PAY",
                order_placed:res.data
            });
            console.log("Paid");
            return props.history.push('/thank-you');

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
                total: state.total,
                admires: state.admires,
                recommends: state.recommends,
                order: state.order,
                orders: state.orders,
                loadLimit: state.loadLimit,
                heros:state.heros,
                goAhead:state.goAhead,
                login,
                logout,
                persistLog,
                forgotPass,
                resetPass,
                registerUser,
                registerArtist,
                editProfile,
                getProfileArtist,
                getProfileUser,
                getPosters,
                getCart,
                getOrders,
                getOrder,
                pay,
                getArtist,
                getPoster,
                getPostersMore,
                createPoster,
                deletePoster,
                editPoster,
                admirePoster,
                unadmirePoster,
                admireArtist,
                unadmireArtist,
                addToCart,
                confirmAcc,
                setCartItemQuantity,
                removeFromCart,
                getAdmiredPosters,
                getTopArtists,
                getRecommends,
                getSales,
                updateCap,
                refreshToken,
                // getHeros
            }}>
            {children}
        </GlobalContext.Provider>
    );
};
