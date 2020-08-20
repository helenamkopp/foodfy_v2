const Chef = require("../models/chef")

module.exports = {
    create(req, res) {
        return res.render("chefs/create")
    },

    post(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Preencha todos os campos!")
            }
        }

        Chef.create(req.body, function(chef) {
            return res.redirect(`/admin/chefs/${chef.id}`)
        })
    },

    show(req, res) {
        console.log(req.params)
        console.log(req.params.id)
        Chef.find(req.params.id, function(chef) {
            if (!chef) return res.send('Chefe não encontrado!')

            Chef.findReceitasChef(req.params.id, function(recipes) {

                return res.render('chefs/show', { chef, recipes })
            })
        })
    },

    index(req, res) {
        Chef.all(function(chefs) {
            return res.render("chefs/index", { chefs })
        })
    },

    edit(req, res) {
        Chef.find(req.params.id, function(chef) {
            if (!chef) return res.send("Chefe não encontrado!")
            return res.render("chefs/edit", { chef })

        })
    },

    put(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Preencha todos os campos!")
            }
        }
        Chef.update(req.body, function() {
            return res.redirect(`/admin/chefs/${req.body.id}`)
        })
    },

    delete(req, res) {
        Chef.delete(req.body.id, function() {
            return res.redirect(`/admin/recipes`)
        })
    },
}