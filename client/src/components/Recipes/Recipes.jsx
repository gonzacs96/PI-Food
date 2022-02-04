import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {RecipeCard} from '../RecipeCard/RecipeCard'
import { sortAlphabeticallyA_Z, sortAlphabeticallyZ_A } from "../../auxFunctions/sortAlphabetically";
import { sortByScoreLess_More, sortByScoreMore_Less } from "../../auxFunctions/sortByScore";
import { clearSearch, setFilterAction } from "../../redux/actions";
import { filterByDiet } from "../../auxFunctions/filterByDiet";
import {Link} from 'react-router-dom'
import s from './Recipes.module.css'

export const Recipes=()=>{
    const dispatch= useDispatch();
    const recipes = useSelector(state=>state.recipes);
    const filterState= useSelector(state=>state.filterState);
    const recipe_search=useSelector(state=>state.search);
    const [stateRecipes,setStateRecipes]= useState({
        recipes:[...recipes],
    });
    const [pages,setPages]=useState(0);
    const [currentPage,setCurrentPage]=useState(1);
    const [startEnd,setStartEnd]=useState({
        start:0,
        end:9
    });

    useEffect(()=>{

        return ()=>{
            dispatch(setFilterAction("default"));
            
        }
    },[dispatch])
    /*eslint-disable */
    useEffect(()=>{
        if(filterState==="default"){
            setStateRecipes(prevState=>{
                const newState={
                    ...prevState,
                    recipes:[...recipes],
                };
                return newState;
            });
        }
        if(filterState==="More_Less"){
            let sortedRecipes=sortByScoreMore_Less(stateRecipes.recipes); // eslint-disable
            setStateRecipes(prevState=>{
                const newState={
                    ...prevState,
                    recipes:sortedRecipes,
                };
                return newState;
            });
        }
        if(filterState==="Less_More"){
            let sortedRecipes=sortByScoreLess_More(stateRecipes.recipes); // eslint-disable
            setStateRecipes(prevState=>{
                const newState={
                    ...prevState,
                    recipes:sortedRecipes,
                };
                return newState;
            });
        }
        if(filterState==="A-Z"){
            let sortedRecipes=sortAlphabeticallyA_Z(stateRecipes.recipes); // eslint-disable
            setStateRecipes(prevState=>{
                const newState={
                    ...prevState,
                    recipes:sortedRecipes,
                };
                return newState;
            });
        }
        if(filterState==="Z-A"){
            let sortedRecipes=sortAlphabeticallyZ_A(stateRecipes.recipes); // eslint-disable
            setStateRecipes(prevState=>{
                const newState={
                    ...prevState,
                    recipes:sortedRecipes,
                };
                return newState;
            });
        }
        if (filterState!=="default" && filterState!=="Z-A" && filterState!=="A-Z" && filterState!=="Less_More" && filterState!=="More_Less") {
            let sortedRecipes=filterByDiet(stateRecipes.recipes,filterState); // eslint-disable
            setStateRecipes(prevState=>{
                const newState={
                    ...prevState,
                    recipes:sortedRecipes,
                };
                return newState;
            });
        }
        

    },[filterState]); 
    /*eslint-enable */
    useEffect(()=>{
        if(filterState==="search"){
            setStateRecipes(prevState=>{
                const newState={
                    ...prevState,
                    recipes:recipe_search
                };
                return newState;
            });
        }
    },[filterState,recipe_search])
    useEffect(()=>{
        if(stateRecipes.recipes.length===0 || stateRecipes.recipes.msg){
                setCurrentPage(0);
                setPages(0);
            return;
        }
        setCurrentPage(1);
        setPages(prevState=>{
            const newState= Math.ceil(stateRecipes.recipes.length/9); 
            return newState;
        })
        console.log("entro")
    },[stateRecipes])

    const resetFilters=()=>{
        setStateRecipes({
            ...stateRecipes,
            recipes:[...recipes]
        })
        setCurrentPage(1);
        setStartEnd({
            ...startEnd,
            start:0,
            end:9
        })
        dispatch(setFilterAction("default"));
        dispatch(clearSearch());
    }
     
    const handleBackPage=(e)=>{
        if(currentPage===1) return;
        if(currentPage===0)return;
        setCurrentPage(prevState=>{
            return prevState-1;
        });
        setStartEnd(prevState=>{
            return {
                ...prevState,
                start:prevState.start-9,
                end:prevState.end-9
            }
        });
    }
    const handleNextPage=(e)=>{
        if(currentPage===pages) return;
        setCurrentPage(prevState=>{
            return prevState+1;
        });
        setStartEnd(prevState=>{
            return {
                ...prevState,
                start:prevState.start+9,
                end:prevState.end+9
            }
        });
    }
    
    return (
        <>
        <button className={s.button} onClick={resetFilters}>Reset</button>
        <div>Pag:{currentPage} de: {pages}</div>
        <button className={s.button} onClick={handleBackPage}>Back</button>
        <button className={s.button} onClick={handleNextPage}>Next</button>
        <ul className={s.conteinerList}>
         {  
            recipe_search.msg?<div>{recipe_search.msg}</div>:
            
            stateRecipes.recipes.slice(startEnd.start,startEnd.end).map(recipe=>{
                if(typeof recipe.diets[0]==="string"){
                    return <li className={s.cardRecipe} key={recipe.id}>
                        <Link className={s.cardRecipeLink} to={`/recipeDetail/${recipe.id}`} >
                        <RecipeCard 
                        name={recipe.name} 
                        image={recipe.image?recipe.image:null} 
                        diet_Types={recipe.diets} 
                        score={recipe.score}/>
                    </Link>
                    </li>
                }
                else {
                    recipe.diets=recipe.diets.map(dieta=> dieta.name)
                    return <li className={s.cardRecipe} key={recipe.id}>
                        <Link className={s.cardRecipeLink} to={`/recipeDetail/${recipe.id}`} >
                        <RecipeCard 
                        name={recipe.name} 
                        image={recipe.image?recipe.image:null} 
                        diet_Types={recipe.diets} 
                        score={recipe.score}/>
                    </Link>
                    </li>
                }
            })
         }
        </ul>
        </>
    )
}