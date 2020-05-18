import React from 'react';
import './App.css';
import { GlobalProvider } from "./context/GlobalState";

import {PostersAll} from  './components/PostersAll' 
import {PostersPhotoshop} from  './components/PhotoshopPostersWall' 
import {PostersPhotography} from  './components/PhotgraphyPostersWall' 
import {PostersGraphic} from  './components/GraphicPostersWall' 
import {PostersTextography} from  './components/TextographyPostersWall' 
import {ArtistProfile} from  './components/ArtistProfile' 
import {PostersAdmired} from  './components/AdmiredPostersWall'

function App() {
  return (
    <div className="App">
      elywalls - Beautiful Posters from Independent Artists.
      
      <GlobalProvider>
        <PostersAdmired/>
      </GlobalProvider>

    </div>
  );
}

export default App;