import React from 'react';
import './App.scss';
import { BrowserRouter as BRouter, Route, Switch } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";
import history from './components/history';

import Header from './components/Header';

import { PostersWall } from './components/PostersWall';
import { Home } from './components/Home';
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Profile } from './components/Profile';
import { Cart } from './components/Cart';

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