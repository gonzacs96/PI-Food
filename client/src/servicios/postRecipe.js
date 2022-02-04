export const postRecipe= async(recipe)=>{
    let recipe_db_response= await fetch (`http://localhost:3001/recipe`,{
                method:'post',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(recipe)
            });
    recipe_db_response=await recipe_db_response.json();  
    return recipe_db_response;      
}