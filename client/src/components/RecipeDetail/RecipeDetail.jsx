import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { getRecipeById , clearRecipeGetedById} from "../../redux/actions";
import foodDefault from "../../assets/foodDefault.jpg"
import { Link } from "react-router-dom";
import s from './RecipeDetail.module.css'

export const RecipeDetail=()=>{
   const {id}=useParams();
   const dispatch = useDispatch();
   const recipe= useSelector(state=> state.recipeGetById);

   useEffect(()=>{
       return ()=> {
           dispatch(clearRecipeGetedById())
       }
   },[dispatch])
   useEffect(()=>{
       dispatch(getRecipeById(id))
   },[dispatch,id])
   
   function summary(){
    return {__html: recipe.summary};
 }


    return (
        <>
        <Link to={'/home'}><button className={s.button}>Volver a home</button></Link>
        
        {
            !recipe.name?<h1>Loading...</h1>:
        <div>
            <h3>{recipe.name}</h3>
            <img src={recipe.image?recipe.image:foodDefault} alt="not found"/>
            <div>Score: {recipe.score}</div>
            <div>Health Score: {recipe.healthScore}</div>
            <h4 dangerouslySetInnerHTML={summary()}></h4>
            <h4>Paso a paso: </h4>
            {
                typeof recipe.stepByStep==="string"?
                recipe.stepByStep:null
            }
            {
                typeof recipe.stepByStep!=="string" && recipe.stepByStep.length!==0?
                <ul>
                {
                    recipe.stepByStep.map((step,index)=>{
                        return <li key={`${step.number}${index}`}>{step.step}</li>
                    })
                }
            </ul>:
              typeof recipe.stepByStep!=="string"?"no hay paso a paso de esta receta":null
            }
            <h4>Dietas: </h4>
            <ul>
            {   
                typeof recipe.diets[0]==="string"?
                recipe.diets.map((dieta,index)=> {
                    return <li key={`${dieta}${index}`}>{dieta}</li>
                }):null
            }
            {
                typeof recipe.diets[0]==="object"?
                recipe.diets.map((dieta,index)=> {
                    return <li key={`${dieta.name}${index}`}>{dieta.name}</li>
                }):null
            }
            </ul>
        </div>
        }
        </>
    )
}