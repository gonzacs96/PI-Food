import React from "react";
import { Link } from "react-router-dom";

export const Home=()=>{
    return (
        <>
        <h1>Aplicacion de Comidas</h1>
        <Link to={'/createRecipe'}><button>Crear Receta</button></Link>
        <div>
           <span>Buscar receta: </span> <input type="search" placeholder="Ingrese una receta" />
        </div>
        <div>
            <select name="select_por_puntuacion" defaultValue={"default"} >
                <option value="default" disabled>Ordernar por puntuacion</option>
                <option value="descendente">Hacia abajo</option>
                <option value="ascendente">Hacia arriba</option>
            </select>
        </div>
        <div>
            <select name="select_por_alfabeto"  defaultValue={"default"} >
                <option value="default" disabled>Ordernar por alfabeto</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
            </select>
        </div>
        <div>
            <select name="select_por_tipo_dieta" defaultValue={"default"} >
                <option value="default" disabled>Ordernar por tipo de dieta</option>
                <option value="Gluten Free">Gluten Free</option>
                <option value="Ketogenic">Ketogenic</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Lacto-Vegetarian">Lacto-Vegetarian</option>
                <option value="Ovo-Vegetarian">Ovo-Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Pescetarian">Pescetarian</option>
                <option value="Paleo">Paleo</option>
                <option value="Low FODMAP">Low FODMAP</option>
                <option value="Whole30">Whole30</option>
            </select>
        </div>
        <div>
            <select name="select_por_origen" defaultValue={"default"}>
                <option value="default" disabled>Mostrar por origen</option>
                <option value="Api">API</option>
                <option value="Local">Local</option>
            </select>
        </div>
        <hr />
            <h2>LISTA DE RECETAS</h2>
        </>
    )
}