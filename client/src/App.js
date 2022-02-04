import './App.css';
import React, { useEffect } from 'react';
import { Route,Routes } from 'react-router-dom';
import { LandingPage } from './components/LandingPage/LandingPage';
import {Home} from './components/Home/Home';
import {CreateRecipe} from './components/CreateRecipe/CreateRecipe';
import { useDispatch} from 'react-redux';
import { setDiets, setRecipes } from './redux/actions';
import {BrowserRouter} from 'react-router-dom';
import { RecipeDetail } from './components/RecipeDetail/RecipeDetail';


function App() {
  const dispatch= useDispatch();

  useEffect(()=>{
    dispatch(setRecipes());
    dispatch(setDiets());
  },[dispatch])

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage/>} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/createRecipe" element={<CreateRecipe/>} />
        <Route path="/recipeDetail/:id" element={<RecipeDetail />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
