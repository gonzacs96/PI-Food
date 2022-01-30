import React from "react";
import { Link } from "react-router-dom";


export const CreateRecipe=()=>{
    
 
    return (
        <>
        <h1>Tu receta</h1>

            <form  >
                <Link to={"/home"}>
                <button>Volver a Home</button>
                </Link>
                    <div>
                        <label htmlFor="nombre">Nombre: </label>
                        <input type="text" name="nombre"/>
                    </div>
                    <div>
                        <label htmlFor="resumenPlato">Resumen del plato: </label>
                        <textarea name="resumenPlato" cols={30} rows={5} ></textarea>
                    </div>
                    <div>
                        <label htmlFor="puntuacion">Puntuacion: </label>
                        <input name="puntuacion" type="number"  max={100} min={0}/>
                        
                    </div>
                    <div>
                        <label htmlFor="nivel_Saludable">Nivel de comida saludable: </label>
                        <input type="number" name="nivel_Saludable"  max={100} min={0}/>
                        
                    </div>
                    <div>
                        <label htmlFor="paso_a_paso">Paso a paso: </label>
                        <textarea name="paso_a_paso"  cols={30} rows={5}></textarea>
                    </div>

                    <button>Agregar</button>
            </form>
        </>
    )
}