import React from 'react';
import { BrowserRouter as BRouter, Route, Switch } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";
import history from './components/history';

import Header from './components/Header';

import { PostersWall } from './pages/PostersWall';
import { Home } from './pages/Home';
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Profile } from './pages/Profile';
import { Cart } from './pages/Cart';
import { Admired } from './pages/Admired';
import { PosterUpload } from './pages/PosterUpload';

import './App.scss';

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
          <Route exact path="/confirmed" component={Login} />
          <Route exact path="/myaccount" component={Profile} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/admires" component={Admired} />
          <Route exact path="/publish-poster" component={PosterUpload} />

          <Route
            path="/posters/:category?"
            render={props => <PostersWall category={props.match.params.category} {...props} />}
          />
        </GlobalProvider>
      </BRouter>
    </div>
  );
}

export default App;