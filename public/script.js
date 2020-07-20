const receitas = document.querySelectorAll(".receitas")
const esconder = document.querySelectorAll("#action")

for(let i = 0; i < receitas.length; i++) {
    receitas[i].addEventListener("click", function(){
        window.location.href = `/recipe/${i}`
    })
}

for(let i = 0; i < esconder.length; i++) {
    esconder[i].addEventListener("click", function(){
        document.querySelector("#lista" + i).classList.toggle("esconder")
        if(document.querySelector("#lista" + i).classList.contains("esconder")){
           esconder[i].innerHTML = "mostrar"
        } else {
            esconder[i].innerHTML = "esconder"
        }
    })
}