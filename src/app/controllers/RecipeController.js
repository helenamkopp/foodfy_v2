const Recipe = require('../models/Recipe')
const Chef = require('../models/Chef')
const File = require('../models/File')
const RecipeRelation = require('../models/RecipeRelation')

module.exports = {
    async create (req, res) {

        const results = await Chef.all()
        const chefs = results.rows

        return res.render('recipes/create', { chefs })
    },
    async post (req, res) {

        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "" && key != "removed_files"){
                return res.send('Please, fill all fields!')
            }
        }

        if ( req.files.length == 0)
            return res.send('Please, send at least one image')

        const filesPromise = req.files.map(file => File.create({...file}))
        const fileResults = await Promise.all(filesPromise) 
        
        const results = await Recipe.create(req.body)
        const recipeId = results.rows[0].id
        
        let filesObj = []
        
        fileResults.map(file => filesObj.push({
            file_id: file.rows[0].id,
            recipe_id: recipeId
        }))

        const recipePromise = filesObj.map(recipeRelation => RecipeRelation.create(recipeRelation))
        await Promise.all(recipePromise)
        

        return res.redirect(`recipes/${recipeId}`)
        
    },
    async show (req, res) {

        let results = await Recipe.find(req.params.id)
        const recipe = results.rows[0]
        
        if (!recipe)
            return res.send("Recipe not found!")

        results = await Chef.find(recipe.chef_id)
        const chef = results.rows[0]
                
        results = await RecipeRelation.findAllImages(recipe.id)
        const files = results.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))
        
        return res.render("recipes/recipeDetails", { recipe, chef, files })
    },
    async edit (req, res) {
        let results = await Recipe.find(req.params.id)
        const recipe = results.rows[0]

        if(!recipe) return res.send("Recipe not found!")

        results = await Chef.all()
        const chefs = results.rows

        results = await RecipeRelation.findAllImages(recipe.id)
        const files = results.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))

        return res.render("recipes/edit", { recipe, chefs, files })
    },
    async put (req, res) {

        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "" && key != "removed_files") {
                return res.send('Please, fill all fields!')
            }
        }

        if (req.files.lenght != 0) {
            const filesPromise = req.files.map(file => File.create({...file}))
            const fileResults = await Promise.all(filesPromise)

            let filesObj = []

            fileResults.map(file => filesObj.push({
                file_id: file.rows[0].id,
                recipe_id: req.body.id
            }))

            const recipePromise = filesObj.map(recipeRelation => RecipeRelation.create(recipeRelation))
            await Promise.all(recipePromise)
        } 

        if (req.body.removed_files) {

            const removedFiles = req.body.removed_files.split(",")
            const lastIndex = removedFiles.length - 1
            removedFiles.splice(lastIndex, 1)

            const relations = removedFiles.map(id => RecipeRelation.findRelationById(id))
            let relationsResults = await Promise.all(relations)
            
            let relationsObj = []

            relationsResults.map (id => relationsObj.push (id.rows[0].file_id))

            const removedFilesRelationPromise = removedFiles.map(id => RecipeRelation.delete(id))
            await Promise.all(removedFilesRelationPromise)

            const removedFilesPromise = relationsObj.map(id => File.delete(id))
            await Promise.all(removedFilesPromise)

        }
        
        await Recipe.update(req.body)

        return res.redirect(`/recipes/${req.body.id}`)
    },
    async delete (req, res) {
        
        let results = await RecipeRelation.findAllImages(req.body.id)
        const files = results.rows
        
        await RecipeRelation.deleteByRelation(req.body.id)
        
        
        const fileResults = files.map(file => file.file_id)
                
        const filesPromise = fileResults.map(file => File.delete(file))
        await Promise.all(filesPromise)

        await Recipe.delete(req.body.id)

        return res.redirect('/recipes')

    }
}