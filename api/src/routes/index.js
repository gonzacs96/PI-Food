const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipeRouter = require ('./recipeRoute');
const dietRouter=require ('./dietRoute');
const createRecipe= require('./createRecipe');

const router = Router();

router.use('/recipes',recipeRouter);
router.use('/types',dietRouter)
router.use('/recipe',createRecipe)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
