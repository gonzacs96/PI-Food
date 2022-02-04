import { getAllRecipes } from "../../servicios/getRecipes";
import { getAllDiets } from "../../servicios/getDiets";
import { postRecipe } from "../../servicios/postRecipe";

export const SET_RECIPES='SET_RECIPES';
export const ADD_RECIPE='ADD_RECIPE';
export const SET_DIET_TYPES='SET_DIET_TYPES';
export const SET_FILTER="SET_FILTER";
export const GET_RECIPE_BY_ID="GET_RECIPE_BY_ID";
export const CLEAR_RECIPE_GETED_BY_ID="CLEAR_RECIPE_GETED_BY_ID"
export const SET_SEARCH="SET_SEARCH"
export const CLEAR_SEARCH="CLEAR_SEARCH"

export const getRecipeById=(id)=>{
    return async (dispatch)=>{
        let recipe_geted_by_id= await fetch (`http://localhost:3001/recipes/${id}`);
        recipe_geted_by_id=await recipe_geted_by_id.json();
        dispatch({
            type:GET_RECIPE_BY_ID,
            payload:recipe_geted_by_id
        })
    }
}

export const clearSearch=()=>{
    return {
        type:CLEAR_SEARCH,
        payload:[]
    }
}

export const setSearch=(name)=>{
    return async (dispatch)=>{
        let recipe_search= await fetch(`http://localhost:3001/recipes?name=${name}`)
        recipe_search=await recipe_search.json();
        dispatch({
            type:SET_SEARCH,
            payload:recipe_search
        })
    }
}

export const setRecipes=()=>{
    return async (dispatch)=>{
        const recipes=await getAllRecipes();
        dispatch({
            type:SET_RECIPES,
            payload:recipes
        })
    }
}

export const clearRecipeGetedById=()=>{
    return {
        type:CLEAR_RECIPE_GETED_BY_ID,
        payload:{}
    }
}


export const createNewRecipe=(receta)=>{
    return async (dispatch)=>{
        const recipe_posted= await postRecipe(receta);
        dispatch({
            type: ADD_RECIPE,
            payload:recipe_posted
        })
    };
};


export const setDiets=()=>{
   return async (dispatch)=>{
       const diets=await getAllDiets();
       dispatch({
           type:SET_DIET_TYPES,
           payload:diets
       })
   }
};

export const setFilterAction=(filtro)=>{
    return {
        type:SET_FILTER,
        payload:filtro
    }
}

