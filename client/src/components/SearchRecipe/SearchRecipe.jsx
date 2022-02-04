import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {setFilterAction, setSearch} from '../../redux/actions/index'
import { useState } from "react";
import s from './SearchRecipe.module.css'

export const SearchRecipe= ()=>{
    const [state,setState]=useState("")

    const dispatch=useDispatch();
    const handleSearch=()=>{
        dispatch(setSearch(state))
        dispatch(setFilterAction("search"))
    }

    const handleChange=(e)=>{
        setState(e.target.value)
    }

    return (
        <>
        <div className={s.conteiner}>
        <Link to={'/createRecipe'}><button className={`${s.button} ${s.create}`}>Crear Receta</button></Link>
        
           <span >Buscar receta: </span> 
           <input className={s.input} type="search"  onChange={handleChange} placeholder="Ingrese una receta" /> 
           <button className={`${s.button} ${s.search}`} onClick={handleSearch}>Buscar</button>
        </div>
        </>
    )
}