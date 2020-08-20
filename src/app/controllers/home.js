const Recipe = require("../models/recipe")
const Chef = require("../models/chef")

exports.main = function (req, res) {
  Recipe.all(function (recipes) {
    return res.render("homepage/main", { recipes })
  })
}

exports.about = function (req, res) {
  return res.render("homepage/about")
}

exports.receitas = function (req, res) {
  let { filter, page, limit } = req.query

  page = page || 1
  limit = limit || 6
  let offset = limit * (page - 1)

  const params = {
    filter,
    page,
    limit,
    offset,
    callback(recipes) {
      let mathTotal =
        recipes[0] == undefined ?
          0 :
          Math.ceil(recipes[0].total / limit);

      const pagination = {
        total: mathTotal,
        page
      };

      return res.render("homepage/revenue", {
        recipes,
        pagination,
        filter
      });
    }
  }
  Recipe.paginate(params)
}

exports.recipesindex = function (req, res) {
  Recipe.find(req.params.id, function (recipes) {
    if (!recipes) return res.send("Receita não encontrada!")
    return res.render("homepage/recipe", { recipes })
  })
}

exports.chefsindex = function (req, res) {
  Chef.findtotalchef(function (chefs) {
    return res.render("homepage/chefs", { chefs })
  })
}