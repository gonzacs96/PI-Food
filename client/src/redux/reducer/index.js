import { 
    SET_RECIPES,
    ADD_RECIPE,
    SET_DIET_TYPES,
    SET_FILTER,
    GET_RECIPE_BY_ID,
    CLEAR_RECIPE_GETED_BY_ID,
    SET_SEARCH,
    CLEAR_SEARCH
 } from "../actions";

 const initialState={
     recipes:[],
     recipeGetById:{},
     filterState:"default",
     diets:[],
     search:[],
 }

 const rootReducer=(state=initialState,action)=>{
     switch (action.type) {
         case SET_RECIPES:
             return {
                 ...state,
                 recipes:state.recipes.concat(action.payload),
             };
        case ADD_RECIPE:
            return {
                ...state,
                recipes:state.recipes.concat(action.payload)
            };
        case SET_DIET_TYPES:
            return {
                ...state,
                diets:[...state.diets,...action.payload]
            };
            
        case SET_FILTER:
            return {
                ...state,
                filterState:action.payload
            };

        case GET_RECIPE_BY_ID:
            return {
                ...state,
                recipeGetById:action.payload,
            };
        case CLEAR_RECIPE_GETED_BY_ID:
            return {
                ...state,
                recipeGetById:{}
            };
        case SET_SEARCH:
            return {
                ...state,
                search:action.payload
            }        
        case CLEAR_SEARCH:
            return {
                ...state,
                search:action.payload
            }    
   
         default:
             return state;
     }
 }


 export default rootReducer;