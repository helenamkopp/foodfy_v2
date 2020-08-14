const data = require('../data.json')
const fs = require("fs")

exports.index = function(req, res) {
    return res.render('admin/index.njk', { recipes: data.recipes })
}

exports.create = function(req, res) {
    const pageTitle = 'Criando receita'
  
    return res.render('admin/create.njk', { pageTitle })
}

exports.show = function(req, res) {
    const { id }  = req.params
  
    const foundRecipe = data.recipes.find(function(recipe) {
      return id == recipe.id
    })
    
    if (!foundRecipe) return res.send('Recipe not found!!!!!!!')
  
    const recipe = {
      ...foundRecipe,
    }
  
  return res.render('admin/show.njk', { recipe })
}

exports.edit = function(req, res) {
    const { id }  = req.params
  
    const foundRecipe = data.recipes.find(function(recipe) {
      return id == recipe.id
    })
    
    if (!foundRecipe) return res.send('Recipe not found!!!!!!!')
  
    const recipe = {
      ...foundRecipe,
    }
  
    return res.render('admin/edit', { recipe })
}


exports.post = function(req, res) {
    const keys = Object.keys(req.body)
    
    for (key of keys) {

        if (req.body[key] == "")
            return res.send("Please, fill all the fields")
    }

    const id = Number(data.recipes.length + 1) 

    data.recipes.push({
        id,
        ...req.body
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err)
            return res.send("Write file ERROR")
    })

    //return res.send(req.body)
    res.redirect("/admin/recipes")
}

exports.put = function(req, res) {
    
    const { id } = req.body
    let index = 0
    console.log(req.body)
    //let { ingredients, preparation } = req.body
    
    const foundRecipe = data.recipes.find(function(recipe, foundIndex) {
        if(id == recipe.id) {
            index = foundIndex
            return true
        }
        //return id == recipe.id
    })
    //console.log(foundRecipe)
    
    if (!foundRecipe)  return res.send("Recipe not found!")
   
    const recipe = {
        ...foundRecipe,
        ...req.body,
        id: Number(id),
        /* ingredients,
        preparation, */
    }

    data.recipes[index] = recipe
    //console.log(data.recipes)

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write error!!!")

        return res.redirect(`/admin/recipes/${id}`)
    })
}

exports.delete = function(req, res) {
    const { id } = req.body

    const filteredRecipes = data.recipes.filter(function(recipe) {
        return recipe.id != id
    })

    data.recipes = filteredRecipes


    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file error")
        
        res.redirect("/admin/recipes")
    })

}