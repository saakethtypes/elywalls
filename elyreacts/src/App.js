import React from "react";
import { BrowserRouter as BRouter, Route, Switch } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";
import history from "./components/history";
import { ProtectedRoute } from "./ProtectedRoute";

import Header from "./components/Header";
import Footer from "./components/Footer";

import { PostersWall } from "./pages/PostersWall";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Account } from "./pages/Account";
import { Profile } from "./pages/Profile";
import { Cart } from "./pages/Cart";
import { Admired } from "./pages/Admired";
import { PosterUpload } from "./pages/PosterUpload";
import { ConfirmAccount } from "./pages/ConfirmAccount";
import { PosterEdit } from "./pages/PosterEdit";
import { PasswordReset } from "./pages/PasswordReset";
import { Poster } from "./pages/Poster";
import { Thankyou } from "./pages/Thankyou";
import { OrdersList } from "./pages/OrdersList";
import { Order } from "./pages/Order";
import { Sales } from "./pages/Sales";
import { Error } from "./pages/Error";
import "./App.scss";

function App() {
    return (
        <div className='App'>
            <BRouter basename='/' history={history}>
                <GlobalProvider>
                    <Header />
                    <Switch>

                        <Route exact path='/' component={Home} />
                        <Route exact path='/login' component={Login} />
                        <Route path='/register' render={(props) => <Register {...props} />} />
                        <Route exact path='/confirmed' component={ConfirmAccount} />
                        <Route
                            path='/profile/:artistId'
                            render={(props) => (
                                <Profile artistId={props.match.params.artistId || ""} {...props} />
                            )}
                        />
                        <Route
                            exact
                            path='/order/:oid'
                            render={(props) => <Order oid={props.match.params.oid} {...props} />}
                        />
                        <Route
                            path='/posters/:category?'
                            render={(props) => (
                                <PostersWall category={props.match.params.category} {...props} />
                            )}
                        />
                        <Route
                            path='/poster/:id'
                            render={(props) => (
                                <Poster posterID={props.match.params.id} {...props} />
                            )}
                        />
                        <Route
                            path='/resetpassword/:id'
                            render={(props) => (
                                <PasswordReset rid={props.match.params.id} {...props} />
                            )}
                        />
                        <ProtectedRoute exact path='/account' component={Account} />
                        <ProtectedRoute exact path='/orders' component={OrdersList} />
                        <ProtectedRoute exact path='/cart' component={Cart} />
                        <ProtectedRoute exact path='/admires' component={Admired} />
                        <ProtectedRoute exact path='/publish-poster' component={PosterUpload} />
                        <ProtectedRoute exact path='/thank-you' component={Thankyou} />
                        <ProtectedRoute
                            path='/sales/:artistId'
                            component={(props) => (
                                <Sales artistId={props.match.params.artistId || ""} {...props} />
                            )}
                        />
                        <ProtectedRoute
                            path='/edit-poster/:id'
                            component={(props) => <PosterEdit posterID={props.match.params.id} />}
                        />
                        
                        <Route path='*' render={(props) => <Error errorID={404} {...props} />} />
                    </Switch>

                    <Footer />
                </GlobalProvider>
            </BRouter>
        </div>
    );
}

export default App;
