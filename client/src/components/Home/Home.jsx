import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Recipes } from "../Recipes/Recipes";
import { SearchFilters } from "../SearchFilters/SearchFilters";
import { SearchRecipe } from "../SearchRecipe/SearchRecipe";
import { SearchSort } from "../SearchSort/SearchSort";
import s from './Home.module.css'

export const Home=()=>{
   
   const stateRecipes= useSelector(state=>state.recipes)
   const [state,setState]=useState(false)
   useEffect(()=>{
     if(stateRecipes.length>0){
       setState(true)
     }
   },[stateRecipes])


    return (
        <>
        <div className={s.conteinerTitle}>
        <h1 className={s.h1}>Aplicacion de Comidas</h1>
        </div>
        
        <div className={s.conteiner}>
        <SearchRecipe />
        <SearchSort/>
        <SearchFilters/>
        </div>
    
        <h2>LISTA DE RECETAS</h2>
        
         {state?<Recipes/>:<h1>Loading..</h1>} 
        
        </>
    )
}