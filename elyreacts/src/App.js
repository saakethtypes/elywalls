import React from 'react';
import './App.css';
import {BrowserRouter as BRouter,Route,Switch} from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";
import history from './components/history'

import {PostersAll} from  './components/PostersAll' 
import {PostersPhotoshop} from  './components/PhotoshopPostersWall' 
import {PostersPhotography} from  './components/PhotgraphyPostersWall' 
import {PostersGraphic} from  './components/GraphicPostersWall' 
import {PostersTextography} from  './components/TextographyPostersWall' 
import {ArtistProfile} from  './components/ArtistProfile' 
import {PostersAdmired} from  './components/AdmiredPostersWall'
import {Home} from  './components/Home'
import { Login } from "./components/Login";
import { RegisterUser } from "./components/UserRegister";
import { RegisterArtist } from "./components/ArtistRegister";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="App">     
    <BRouter basename="/" history={history}>
      <GlobalProvider>
        <Header/>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={RegisterUser} />
        <Route exact path="/register-artist" component={RegisterArtist} />
        <Route exact path="/photography" component={PostersPhotography} />
        <Route exact path="/graphic-design" component={PostersGraphic} />
        <Route exact path="/textography" component={PostersTextography} />
        <Route exact path="/photoshop" component={PostersPhotoshop} />
        <Route exact path="/all" component={PostersAll} />

      </GlobalProvider>
    </BRouter>
    </div>
  );
}

export default App;