const appreducer = (state, action) => {
    switch (action.type) {

        case "ERROR":
            return {
                ...state,
                ...state.error,
                error: action.payload
            };

            case "GET_USER":
                return {
                    ...state,
                    user: action.user_current,
                    cart: action.user_current.cart,
                    log_status: true
                };

        case "LOGIN":
            return {
                ...state,
                user: action.logged_profile,
                cart: action.logged_profile.cart,
                log_status: true,
                admires:[]
            };

        case "LOGOUT":
            return {
                ...state,
                user: null,
                log_status: false
            };

        case "EDIT_PROFILE":
            return {
                ...state,
                ...state.user,
                user: action.editted_user
            };

        case "GET_POSTERS_STARTED":
            return {
                ...state,
                posters: {
                    isLoading: true
                }
            };
        case "GET_POSTERS_FAILED":
            return {
                ...state,
                posters: {
                    isLoading: false,
                    error: action.payload
                }
            };
        case "GET_POSTERS_SUCCEEDED":
            return {
                ...state,
                posters: {
                    isLoading: false,
                    posters: action.payload
                }
            };

    
        case "ADMIRED_ARTISTS":
            return {
                ...state,
                artists: action.user_admiredA
            };

        

        case "CART_GET":
            return {
                ...state,
                cart:action.cartItems,
                total:action.total,
                user:{
                    ...state.user,
                    cart:action.cartItems
                }
            } 
            
        case "GET_ADMIRED_POSTERS":
            return {
                ...state,
                admires:action.admires,
                user:{
                    ...state.user,
                    admires:action.admires
                }
            } 
        case "POSTER_SINGLE":
            return {
                ...state,
                poster: action.poster
            };

        case "ARTIST_PROFILE":
            return {
                ...state,
                artist: action.artist
            };
        
        case "TOP_ARTISTS":
            return {
                ...state,
                artists: action.artists
            };
    
        case "RECOMMENDS":
            return {
                ...state,
                recommends: action.recommends
            };
        case "EDIT_POSTER":
            return {
                ...state,
                poster: action.artist
            };

        case "ADD_TO_CART":
            return {
                ...state,
                cart: [
                    ...state.cart, action.cart
                    ],
                user: {
                    ...state.user,
                    cart: [
                        ...state.user.cart, action.cart
                    ]
                }
            };

        case "CART_QUANTITY":
            return {
                ...state,
                user: {
                    ...state.user,
                    cart: state.cart.map(cartitem=>
                        action.ci ===cartitem._id?
                       { ...cartitem,
                           quantity : action.quantity,
                           price_with_quantity: action.poster_price     
                            }:
                       cartitem) 
                },
                cart: state.cart.map(cartitem=>
                         action.ci ===cartitem._id?
                        { ...cartitem,
                            quantity : action.quantity,
                            price_with_quantity: action.poster_price     
                             }:
                        cartitem) 
                    }

        case "DELETE_FROM_CART":
            return {
                ...state,
                cart: [
                        ...state.cart.filter(
                            cartitem => action.item_removed !== cartitem._id
                        )],
                user: {
                    ...state.user,
                    cart: [
                        ...state.user.cart.filter(
                            cartitem => action.item_removed !== cartitem._id
                        )]
                }
            };

            case "ADMIRE_P":
                return {
                    ...state,
                    admires: [
                    ...state.admires, action.newadmire
                    ],
                    user: {
                        ...state.user,
                        admires: [...state.user.admires, action.newadmire]
                    }
                };
            case "UNADMIRE_P":
                return {
                    ...state,
                    admires: [
                        ...state.admires.filter(
                            item => action.unadmired._id !== item._id
                            )],
                    user: {
                        ...state.user,
                        admires: [
                            ...state.user.admires.filter(
                                item => action.unadmired._id !== item._id
                            )
                        ]
                    },
                };

        case "PROFILE_A":
            return {
                ...state,
                user:{
                    ...state.user,
                    postersmade: action.posters_made
                }
            };
        
        case "PAY":
                return {
                    ...state,
                    order: action.order_placed
                };
    
        case "ORDER_GET":
            return {
                ...state,
                orders:action.orders
            };

        case "SALES_GET":
            return {
                ...state,
                user:{
                    ...state.user,
                    postersmade: action.salesPosters
                }
            };

        case "ORDER_SINGLE_GET":
            return {
                ...state,
                order:action.order
            };
        default:
            return state;

    }
};

export default appreducer;
