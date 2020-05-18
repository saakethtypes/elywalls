import React from 'react';
import { GlobalProvider } from "./context/GlobalState";

import './App.scss';

import Header from './components/Header';

import { PostersAll } from './components/PostersAll';
import { PostersPhotoshop } from './components/PhotoshopPostersWall';
import { PostersPhotography } from './components/PhotgraphyPostersWall';
import { PostersGraphic } from './components/GraphicPostersWall';
import { PostersTextography } from './components/TextographyPostersWall';
import { ArtistProfile } from './components/ArtistProfile';
import { PostersAdmired } from './components/AdmiredPostersWall';

function App() {
  return (
    <div className="App">
      <Header />

      <GlobalProvider>
        <PostersAll />
      </GlobalProvider>

    </div>
  );
}

export default App;