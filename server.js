const express = require("express")
const nunjucks = require("nunjucks")

const server = express()
const receitas = require("./data")

server.use(express.static("public"))
server.use(express.static("imagens"))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res){
    const banner = {
        title: "As melhores receitas",
        subtitle: "Aprenda a construir os melhores pratos com receitas criadas por profissionais do mundo inteiro."
    }
    return res.render("home", { items: receitas, banner})
})

server.get("/sobre", function(req, res){
    return res.render("sobre")
})

server.get("/receitas", function(req, res){
    return res.render("receitas", { items: receitas })
})

server.get("/recipe/:index", function(req, res){
        const recipeIndex = req.params.index
        
        return res.render("recipe", { item: receitas[recipeIndex] })

})

server.listen(5001, function(){
    console.log("server is running!")
})