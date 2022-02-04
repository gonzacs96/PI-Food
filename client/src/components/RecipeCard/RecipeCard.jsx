import React from "react";
import foodDefault from '../../assets/foodDefault.jpg'

export const RecipeCard=({image,name,diet_Types,score})=>{

    return (
        <>
        <div>
            <h4>{name}</h4>
            <img src={image?image:foodDefault} alt="not found" />
            <div>Score: {score}</div>
            <ul>
                {
                    diet_Types.map((dieta,index)=>{
                        return <li key={index}>{dieta}</li>
                    })
                }
            </ul>
        </div>
        </>
    )
}

