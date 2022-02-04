import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewRecipe} from "../../redux/actions";
import { useEffect } from "react";
import s from './CreateRecipe.module.css'


const putDietsOnRecipe=(stateCheckboxs)=>{
    let result=Object.values(stateCheckboxs);
    result=result.filter(el=> el.checked===true)
    result=result.map(el=> parseInt(el.value)) 
    return result;
};

export const CreateRecipe=()=>{
    const dispatch=useDispatch();
    const diets_state=useSelector(state=>state.diets);

    const [recipe,setRecipe]= useState({
        name:"",
        summary:"",
        healthScore:"",
        score:"",
        stepByStep:"",
        diets:[],
    });

    const [checkboxs,setCheckboxs]=useState({
    });

    const handleChange=(e)=>{
        setRecipe({
            ...recipe,
            [e.target.name]:e.target.value
        });
    };

    const setValueCheckBox=(e)=>{
        setCheckboxs({
            ...checkboxs,
            [e.target.name]:{
               checked:e.target.checked,
               value:e.target.value,
               element:e.target
            }
        });
    }

    const sendRecipe=(event)=>{
        event.preventDefault();
        if(validateName(recipe.name) && recipe.name!=="" && recipe.summary!=="" && recipe.summary!==" "){
            dispatch(createNewRecipe(recipe));
            cleanForm();
        }
        else {
            alert("Revise los datos del formulario")
        }
    };

    const validateName=(name)=>{
       return /^[a-zA-Z\s]*$/.test(name)
    };
    
    const cleanForm=()=>{
         //limpio recipe
         setRecipe({
            name:"",
            summary:"",
            healthScore:"",
            score:"",
            stepByStep:"",
            diets:[]
        });
        //limpio los checkkboxs
        Object.values(checkboxs).map(elem=> elem.element.checked=false);
        setCheckboxs({});
    }

useEffect(()=>{
   let diets_on_recipe= putDietsOnRecipe(checkboxs);
   setRecipe(r=>{
       const newState= {
           ...r,
           diets:diets_on_recipe
       }
       return newState
   })
   
},[checkboxs])

    return (
        <>
        <Link to={"/home"}>
        <button className={s.button}>Volver a Home</button>
        </Link>
        <h1>Tu receta</h1>
            <form onSubmit={sendRecipe}>
                <div className={s.conteinerInputs}>
                <input className={s.input} type="text" name="name" placeholder="Ingrese un nombre" onChange={handleChange} value={recipe.name} />
                {
                    !validateName(recipe.name)?<span>Ingresa nombre valido</span>:null
                }
                <input className={s.input} type="text" name="summary" placeholder="Ingrese un resumen" onChange={handleChange} value={recipe.summary} />
                {
                   recipe.summary===" "?<span>Ingresa un resumen valido</span>:null
                }
                <input className={s.input} type="number" name="score" placeholder="Ingrese una puntuacion" onChange={handleChange} value={recipe.score} />
                {
                    recipe.score<0 || recipe.score>100?<span>Ingresa un score de 1-100</span>:null
                }
                <input className={s.input} type="number" name="healthScore" placeholder="Ingrese nivel de comida sana" onChange={handleChange} value={recipe.healthScore} />
                {
                    recipe.healthScore<0 || recipe.healthScore>100?<span>Ingresa un nivel de 1-100</span>:null
                }
                <input className={s.input} type="text" name="stepByStep" placeholder="Ingrese un paso a paso" onChange={handleChange} value={recipe.stepByStep}/>
                </div>
               

                <div>
                    {
                        diets_state.map(dieta=>{
                           return (
                             <div key={dieta.id}> 
                                 <label htmlFor={dieta.name}>{dieta.name}</label>   
                                 <input type="checkbox" name={dieta.name} value={dieta.id} onChange={setValueCheckBox}/>
                             </div>  
                           ) 
                        })
                    }
                </div> 
                    <button className={s.button} type="submit" >Enviar Receta</button>
                    
                
            </form>
        </>
    )
}