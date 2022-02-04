export const getAllDiets=async()=>{
    let diets= await fetch(`http://localhost:3001/types`);
    diets=await diets.json();
    return diets;
}