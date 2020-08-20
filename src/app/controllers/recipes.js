const Recipe = require("../models/recipe")


module.exports = {
    create(req, res) {
        Recipe.chefOptions(function (options) {
            return res.render("admins/create", { chefOptions: options })
        })
    },
    post(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Preencha todos os campos!")
            }
        }

        Recipe.create(req.body, function (recipe) {
            return res.redirect(`/admin/recipes/${recipe.id}`)
        })

    },
    show(req, res) {
        Recipe.find(req.params.id, function (recipes) {
            if (!recipes) return res.send("Receita não encontrada!")
            return res.render("admins/show", { recipes })

        })
    },
    index(req, res) {
        Recipe.all(function (recipes) {
            return res.render("admins/index", { recipes })
        })
    },
    edit(req, res) {
        Recipe.find(req.params.id, function (recipe) {
            if (!recipe) return res.send("Receita não encontrado!")

            Recipe.chefOptions(function (options) {
                return res.render("admins/edit", { recipe, chefOptions: options })
            })
        })
    },
    put(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Preencha todos os campos!")
            }
        }
        Recipe.update(req.body, function () {
            return res.redirect(`/admin/recipes/${req.body.id}`)
        })
    },
    delete(req, res) {
        Recipe.delete(req.body.id, function () {
            return res.redirect(`/admin/recipes`)
        })
    },
}