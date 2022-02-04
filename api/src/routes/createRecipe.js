require ('dotenv').config();
const {Router}= require ('express');
const {Recipe,Diet}= require ('../db');

const router = Router();

router.post('/', async (req,res)=>{
    const {name, summary, healthScore, score, stepByStep, diets }= req.body;
    if(!name || !summary){
        res.status(404).json({error: 'Necesita mandar un nombre y resumen para crear una receta'});
    }
    else {
        try {
            let [recipe,created]= await Recipe.findOrCreate({
                where:{name:name},
                defaults:{
                    name:name,
                    summary:summary,
                    healthScore:healthScore?healthScore:null,
                    score:score?score:null,
                    stepByStep:stepByStep?stepByStep:null
                }  
            });
            /* await recipe.addDiets(diets); */
            diets.length>0?
            await recipe.addDiet(diets):null;

            let recipe_response=await Recipe.findOne({
                where:{name:name},
                include:[{
                    model: Diet,
                    attributes:["name"]
                }]
            })

            res.status(200).json(recipe_response)
        } catch (error) {
            res.status(404).json({error:"Error al agregar una receta"})
        }
    };
});

module.exports=router;