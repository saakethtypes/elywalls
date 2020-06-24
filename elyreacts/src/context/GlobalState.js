import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
import auth from "../auth";
import { Redirect } from "react-router-dom";
import { v4 } from "uuid";

let logUser = JSON.parse(localStorage.getItem("currentUser") || null);
let ls = false;
let usercart = null;
let logArtist = null;
let useradmired = null;
let userorders = null;

if (logUser) {
    console.log(logUser);
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
    orders:userorders
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
            await axios.post("/register-buyer", user, config);
        } catch (err) {
            dispatch({
                type: "ERROR",
                payload: err.data,
            });
        }
    }

    async function registerArtist(artist,dp) {
        try {
            console.log("object",dp)
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
            console.log("gs regists")
            const res = await axios.post("/register-artist", formData, config);
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
                console.log("logged in ");
            } else {
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
        console.log("logout");
        localStorage.removeItem("jwt");
        localStorage.removeItem("currentUser");

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
            await axios.post(`/forgot-password`, { email: email, id: token }, config);
        } catch (err) {
            dispatch({
                type: "ERROR",
                payload: err.data,
            });
        }
    }

    async function resetPass(password, id) {
        try {
            console.log(password, id);
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            await axios.post(`/reset-password/`, { password: password, id: id }, config);
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

    async function getPosters(category = "all") {
        const getEndpoint = (category) => {
            console.log(category);
            switch (category) {
                case "all":
                    return "/all";
                case "latest":
                    return "/latest";
                case "textography":
                    return "/textography";
                case "photoshop":
                    return "/photoshop";
                case "photography":
                    return "/photography";
                case "graphic-design":
                    return "/graphic-design";
                case "popular":
                    return "/popular";
                case "admires":
                    return "/nonexistent";
                default:
                    return "all";
            }
        };

        dispatch({
            type: "GET_POSTERS_STARTED",
        });

        try {
            const config = {
                headers: { "Content-type": "Application/json" },
            };
            const res = await axios.get(getEndpoint(category), config).catch((err) => {
                console.log(err);
            });
            console.log(category, res);
            dispatch({
                type: "GET_POSTERS_SUCCEEDED",
                payload: res.data.posters,
            });
        } catch (err) {
            console.log(err);
            dispatch({
                type: "GET_POSTERS_FAILED",
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
            console.log("reached cart gs", config);

            let ress = await axios.get("/cart", config).catch((err) => {
                console.log(err.response);
            });
            console.log(ress.data);
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
            console.log("saved after getting carts");
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
            console.log("reached order gs", config);

            let ress = await axios.get("/orders", config).catch((err) => {
                console.log(err.response);
            });
            console.log(ress.data);
            dispatch({
                type: "ORDER_GET",
                orders: ress.data.orders
            });

            localStorage.setItem("currentUser", JSON.stringify(state.user));
            console.log("saved after getting order");
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
            console.log("admires", ress.data.posters);

            dispatch({
                type: "GET_ADMIRED_POSTERS",
                admires: ress.data.posters,
            });

            localStorage.setItem("currentUser", JSON.stringify(state.user));
            console.log("admires saved");
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
            console.log("recc", ress.data.recommends);

            dispatch({
                type: "RECOMMENDS",
                recommends: ress.data.recommends,
            });

            localStorage.setItem("currentUser", JSON.stringify(state.user));
            console.log("admires saved");
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
            console.log(res.data.artist[0]);
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
            console.log(res.data.artists);
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
            console.log(res.data.msg);
            return props.history.push(`/profile/${state.user.username}`);
        } catch (err) {
            dispatch({
                type: "ERROR",
                payload: err.data,
            });
        }
    }

    async function editPoster(pid, editted_poster,props) {
        console.log("object");
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "x-auth-token": localStorage.getItem("jwt"),
                },
            };
            console.log(editted_poster);
            await axios.patch(`/poster-edit/${pid}`, editted_poster, config);
            console.log(JSON.parse(editted_poster));
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

    async function addToCart(pid) {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "x-auth-token": localStorage.getItem("jwt"),
                },
            };

            let x = { s: 0 };
            const res = await axios.patch(`/cartadd/${pid}`, x, config);
            console.log(res);
            if (res.data.err) {
                localStorage.removeItem("jwt");
                localStorage.removeItem("currentUser");
                console.log("redirect to login");
                await axios.get(`/redirectlogin`, {
                    headers: {
                        "Content-type": "application/json",
                    },
                });
            } else {
                console.log("3) Added to cart in Db");
                dispatch({
                    type: "ADD_TO_CART",
                    cart: res.data.cartObj[0],
                });
            }
            localStorage.setItem("currentUser", JSON.stringify(state.user));
            console.log("reached - saved after adding to cart");
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
            dispatch({
                type: "DELETE_FROM_CART",
                item_removed: cid,
            });
            localStorage.setItem("currentUser", JSON.stringify(state.user));
            console.log("reached - saved after removing from cart");
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
            console.log("2)gs admire");
            let res = await axios.patch(`/admireP/${poster._id}/`, { x: 0 }, config);
            console.log(res.data);
            if (res.data.err) {
                console.log("redirect to login");
                localStorage.removeItem("jwt");
                localStorage.removeItem("currentUser");
                await axios.get(
                    `/redirectlogin`,

                    {
                        headers: {
                            "Content-type": "application/json",
                        },
                    }
                );
            } else {
                console.log("admiring gs");
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
            if (res.data.err) {
                console.log("redirect to login");
                await axios.get(`/redirectlogin`, {
                    headers: {
                        "Content-type": "application/json",
                    },
                });
            } else {
                console.log("undmiring gs");

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
            const config = {
                headers: {
                    "x-auth-token": localStorage.getItem("jwt"),
                },
            };
            const res = await axios.post("/publish-poster", formData, config);
            console.log("doneuploaded broo");

            dispatch({
                type: "CREATE_POSTER",
                poster_created: res.data.poster_created,
            });
            console.log(`/profile/${state.user.username}`)
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
            console.log(res.data);
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
            const res = await axios.get("/profile", config);
            console.log(res.data);
            dispatch({
                type: "PROFILE_A",
                posters_made: res.data.profile.postersmade,
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
            console.log(oid)
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": localStorage.getItem("jwt"),
                },
            };
            const res = await axios.get(`/order/${oid}`, config);
            console.log(res.data);
            dispatch({
                type: "ORDER_SINGLE_GET",
                order: res.data.order,
            });
        } catch (err) {
            console.log(err)
            dispatch({
                type: "ERROR",
                payload: err.data,
            });
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
           console.log(res.data)
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
                createPoster,
                deletePoster,
                editPoster,
                admirePoster,
                unadmirePoster,
                admireArtist,
                unadmireArtist,
                addToCart,
                setCartItemQuantity,
                removeFromCart,
                getAdmiredPosters,
                getTopArtists,
                getRecommends,
            }}>
            {children}
        </GlobalContext.Provider>
    );
};
