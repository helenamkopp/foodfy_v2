const Recipe = require('../models/Recipe')
const Chef = require('../models/Chef')
const RecipeRelation = require('../models/RecipeRelation')
const { file } = require('../models/Chef')

module.exports = {
    async index (req, res) {

        let results = await Recipe.all()
        let recipes = results.rows

        if (!recipes) return res.send('There aren\'t recipes to show')

        async function getImage(recipeId) {
            let results = await Recipe.files(recipeId)
            const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`)

            return files[0]
        }

        const recipesPromise = recipes.map(async recipe => {
            recipe.recipe_id = recipe.recipe_id
            recipe.title = recipe.title
            recipe.chef_name = recipe.name
            recipe.src = await getImage(recipe.recipe_id)
            return recipe
        })

        const lastAdded = await Promise.all(recipesPromise)

        return res.render('recipes/home/index', { recipes: lastAdded })
    }
}