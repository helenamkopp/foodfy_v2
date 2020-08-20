const express = require("express")
const routes = express.Router()
const recipes = require("./app/controllers/recipes")
const home = require("./app/controllers/home")
const chefs = require("./app/controllers/chefs")


console.log('o')
routes.get("/", home.main)
routes.get("/sobre", home.about)
routes.get("/receitas", home.receitas)
routes.get("/recipes/:id", home.recipesindex)
routes.get("/chefs", home.chefsindex)

routes.get('/admin/recipes', recipes.index)
routes.get("/admin/create", recipes.create)
routes.get("/admin/recipes/:id", recipes.show)
routes.get("/admin/recipes/:id/edit", recipes.edit)
routes.post("/admin/recipes", recipes.post)
routes.put("/admin/recipes", recipes.put)
routes.delete("/admin/recipes", recipes.delete)

routes.get('/admin/chefs', chefs.index)
routes.get("/admin/create/chefs", chefs.create)
routes.get("/admin/chefs/:id", chefs.show)
routes.get("/admin/chefs/:id/edit", chefs.edit)
routes.post("/admin/chefs", chefs.post)
routes.put("/admin/chefs", chefs.put)
routes.delete("/admin/chefs", chefs.delete)


module.exports = routes