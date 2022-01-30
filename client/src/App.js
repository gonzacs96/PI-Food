import './App.css';
import React from 'react';
import { Route,Routes } from 'react-router-dom';
import { LandingPage } from './components/LandingPage/LandingPage';
import {Home} from './components/Home/Home';
import {CreateRecipe} from './components/CreateRecipe/CreateRecipe';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage/>} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/createRecipe" element={<CreateRecipe/>} />
      </Routes>
    </div>
  );
}

export default App;
