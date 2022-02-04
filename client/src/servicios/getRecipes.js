
export const getAllRecipes=async()=>{
   let recipes= await fetch(`http://localhost:3001/recipes`);
   recipes=await recipes.json();
   if (recipes.hasOwnProperty('error')){
      return [];
   }
   return recipes;

}
