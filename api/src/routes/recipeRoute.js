require ('dotenv').config();
const {Router}= require ('express');
const {Recipe,Diet}= require ('../db');
const fetch = require('cross-fetch');
const { Op } = require('sequelize');

const set_number_recipes=100;
const {API_KEY}= process.env;
const API_URL=`https://api.spoonacular.com/recipes/complexSearch?number=${set_number_recipes}&addRecipeInformation=true&apiKey=${API_KEY}`
const router = Router();

router.get('/' , async (req,res)=>{
    //recibo por query ?name, y verifico si lo tengo o no
    //en base a eso traigo esa receta con ese nombre, o las primeras 100 recetas
    //incluyo tambien las de mi base de datos.
    const {name}= req.query;
    try {
        if (name){
            let recetas_db= await Recipe.findAll({
                where:{name:{[Op.substring]:name}},
                include:[{
                    model:Diet,
                    attributes:["name"]
                }]
            })
            // agrego titleMatch para buscar en la api por nombre
            let recetas = await fetch(API_URL+`&titleMatch=${name}`)
            recetas=await recetas.json();
            let resultado_fetch= recetas.results.map(receta=>(
                {
                    id:receta.id,
                    name:receta.title,
                    score:receta.spoonacularScore,
                    image:receta.image,
                    diets:receta.diets,
                    dishTypes:receta.dishTypes
                })
            );
            let resultado_final=recetas_db.concat(resultado_fetch)
            if (resultado_final.length===0) return res.status(200).json({msg:"No se encontro una receta con ese nombre"})
            res.status(200).json(resultado_final);
        }
        else {
            let recetas_db= await Recipe.findAll({
                include:[{
                    model:Diet,
                    attributes:["name"]
                }]
            });
            let recetas = await fetch(API_URL);
            recetas=await recetas.json();
            let resultado= recetas.results.map(receta=>(
                {
                    id:receta.id,
                    name:receta.title,
                    score:receta.spoonacularScore,
                    image:receta.image,
                    diets:receta.diets,
                    dishTypes:receta.dishTypes
                })
            );
            res.status(200).json(recetas_db.concat(resultado));
        };
    } catch (error) {
        res.status(404).json({error: "error al pedir las recetas a base de datos o a la API"});
    }
});

router.get('/:idReceta', async (req,res)=>{
    //valido si es un UUID
    //en caso que lo sea lo busco en mi DB. Si lo encuentro lo devuelvo
    //y si no devuelvo un mensaje
    const {idReceta}=req.params;
       try {
           if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(`${idReceta}`)){
               let receta_db= await Recipe.findByPk(idReceta,{
                   include:Diet
               });
               receta_db?res.status(200).json(receta_db):res.status(200).json({msg:"No existe receta con ese ID"});
           }
           else {
               let receta_api= await fetch(`https://api.spoonacular.com/recipes/${idReceta}/information?apiKey=${API_KEY}`);
                   receta_api=await receta_api.json();
                   res.status(200).json({
                       name:receta_api.title,
                       summary:receta_api.summary,
                       image:receta_api.image,
                       score:receta_api.spoonacularScore,
                       healthScore:receta_api.healthScore,
                       diets:receta_api.diets,
                       stepByStep:receta_api.analyzedInstructions.length!==0?receta_api.analyzedInstructions[0].steps.map(receta=>({
                           number:receta.number,
                           step:receta.step
                       })):[]
                   });
           }
       } catch (error) {
           res.status(404).json({error:"error al pedi una receta por id a la API o a la db"})
       }
});


module.exports= router;