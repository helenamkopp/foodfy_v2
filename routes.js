const express = require('express')
const routes = express.Router()

const hpage = require('./controllers/hpageController')
const recipes = require('./controllers/recipesController')

// hpage
routes.get('/', hpage.home)
routes.get('/about', hpage.about)
routes.get('/recipes', hpage.index)
routes.get('/recipes/:id', hpage.show)

//admin
routes.get('/admin/recipes', recipes.index) // Mostrar a lista de receitas
routes.get('/admin/recipes/create', recipes.create) // Mostrar formulário de nova receita
routes.get('/admin/recipes/:id', recipes.show) // Exibir detalhes de uma receita
routes.get('/admin/recipes/:id/edit', recipes.edit) // Mostrar formulário de edição de receita

routes.post('/admin/recipes', recipes.post) // Cadastrar nova receita
routes.put('/admin/recipes', recipes.put) // Editar uma receita
routes.delete('/admin/recipes', recipes.delete) // Deletar uma receita */

module.exports = routes