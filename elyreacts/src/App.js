import React from 'react';
import { BrowserRouter as BRouter, Route, Switch } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";
import history from './components/history';

import Header from './components/Header';
import Footer from './components/Footer';

import { PostersWall } from './pages/PostersWall';
import { Home } from './pages/Home';
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Account } from './pages/Account';
import { Cart } from './pages/Cart';
import { Admired } from './pages/Admired';
import { PosterUpload } from './pages/PosterUpload';
import { ConfirmAccount } from './pages/ConfirmAccount';

import './App.scss';
import { Poster } from './pages/Poster';

function App() {
  return (
    <div className="App">
      <BRouter basename="/" history={history}>
        <GlobalProvider>
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route
            path="/register"
            render={props => <Register {...props} />}
          />
          <Route exact path="/confirmed" component={ConfirmAccount} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/admires" component={Admired} />
          <Route exact path="/publish-poster" component={PosterUpload} />

          <Route
            path="/posters/:category?"
            render={props => <PostersWall category={props.match.params.category} {...props} />}
          />

          <Route
            path="/poster/:id"
            render={props => <Poster posterID={props.match.params.id} {...props} />}
          />

          <Footer />
        </GlobalProvider>
      </BRouter>
    </div>
  );
}

export default App;