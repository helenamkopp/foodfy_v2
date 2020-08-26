const Chef = require('../models/Chef')
const Recipe = require('../models/Recipe')
const File = require('../models/File')
const { show } = require('./RecipeController')

module.exports = {
    create (req, res) {

        return res.render("chefs/create")
    },
    async index (req, res) {

        let results = await Chef.all()
        const chefs = results.rows

        async function getImage(chefId){
            let results = await Chef.file(chefId)
            const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`)

            return files[0]
        }

        const chefsPromise = chefs.map(async chef => {
            chef.name = chef.name
            chef.src = await getImage(chef.file_id)
            return chef
        })

        const lastAdded = await Promise.all(chefsPromise)

        return res.render('chefs/chefs.njk', { chefs: lastAdded })
    },
    async post (req, res) {

        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all fields!")
            }
        }
        
        if(req.files.length == 0 )
            return res.send('Please, send at least one image')

        let results = await File.create(req.files[0])
        const fileId = results.rows[0].id
        
        results = await Chef.create(req.body, fileId)
        const chefId = results.rows[0].id
                
        return res.redirect(`/chefs`)
    },
    async show (req, res) {

        let results = await Chef.find(req.params.id)
        const chef = results.rows[0]

        chef.src = `${req.protocol}://${req.headers.host}${chef.path.replace("public", "")}`

        if(!chef) return res.send('Chef not found!')

        results = await Recipe.findChefRecipes(chef.id)
        const recipes = results.rows

        async function getImage(recipeId){
            let results = await Recipe.files(recipeId)
            const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`)

            return files[0]
        }

        const recipesPromise = recipes.map(async recipe => {
            recipe.title = recipe.title
            recipe.src = await getImage(recipe.id)
            recipe.length = recipes.length
            return recipe
        })

        const lastAdded = await Promise.all(recipesPromise)
        
        return res.render("chefs/chefDetail", { chef, recipes: lastAdded })
    },
    async edit (req, res) {

        let results = await Chef.find(req.params.id)
        const chef = results.rows[0]

        if (!chef) return res.send ('Chef not found!')

        results = await Chef.file(chef.file_id)
        const chefFile = results.rows[0]
        
        chefFile.src = `${req.protocol}://${req.headers.host}${chefFile.path.replace("public", "")}`
        
        return res.render ("chefs/edit", { chef, file: chefFile })
    },
    async put (req, res) {

        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "" && key != "removed_files") {
                return res.send('Please, fill all fields!')
            }
        }

        let fileId = ""

        if (req.files.length != 0) {

            fileId = await File.create(req.files[0])
            results = await Chef.update(req.body, fileId.rows[0].id)

        } else {
                            
            results = await Chef.update(req.body, req.body.file_id)
        }    

        if (req.body.removed_files) {
            let removedFiles = req.body.removed_files.split(",")

            removedFiles = parseInt(removedFiles)

            await File.delete(removedFiles)
        }


        return res.redirect(`/chefs/${req.body.id}`)
    },
    async delete (req, res) {

        await Chef.delete(req.body.id)

        await File.delete(req.body.file_id)

        return res.redirect('/chefs/create')

    }
}