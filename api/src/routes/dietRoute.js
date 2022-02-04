require ('dotenv').config();
const {Router}= require ('express');
const {Diet}= require ('../db');

const router = Router();

router.get('/', async(req,res)=>{
    try {
        const diets= await Diet.findAll();
        res.status(200).json(diets);
    } catch (error) {
        res.status(404).json({error:"Error al mostrar los tipos de dieta"})
    }
});

module.exports= router