const Recipe = require('../models/Recipe')

module.exports = {
    async index(req, res) {

        try {
            
            let results,
                params = {}

            const { filter } = req.query

            if(!filter) return res.redirect("/")

            params.filter = filter

            results = await Recipe.search(params)

            async function getImage(recipeId) {
                let results = await Recipe.files(recipeId)
                const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`)

                return files[0]
            }

            const recipesPromise = results.rows.map(async recipe => {
                recipe.recipe_id = recipe.id
                recipe.title = recipe.title
                recipe.chef_name = recipe.chef_name
                recipe.src = await getImage(recipe.recipe_id)
                return recipe
            })

            const recipes = await Promise.all(recipesPromise)

            const search = {
                term: req.query.filter,
                total: recipes.length
            }

            return res.render ("recipes/search/index", { recipes, search })

        } catch(err) {
            console.log(err)
        }
    }
}