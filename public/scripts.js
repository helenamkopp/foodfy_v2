const receitas = document.querySelectorAll(".receitas")
const esconder = document.querySelectorAll("#action")

for (let i = 0; i < receitas.length; i++) {
    receitas[i].addEventListener("click", function() {
        window.location.href = `/recipes/${i}`
    })
}

for (let i = 0; i < esconder.length; i++) {
    esconder[i].addEventListener("click", function() {
        document.querySelector("#lista" + i).classList.toggle("esconder")
        if (document.querySelector("#lista" + i).classList.contains("esconder")) {
            esconder[i].innerHTML = "mostrar"
        } else {
            esconder[i].innerHTML = "esconder"
        }
    })
}

const currentpage = location.pathname
const menuItems = document.querySelectorAll("header .links a")

for (item of menuItems) {
    if (currentpage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}


function paginate(selectedpages, totalpages) {
    let pages = [],
        oldpage

    for (let currentpage = 1; currentpage <= totalpages; currentpage++) {

        const firstandlastpage = currentpage == 1 || currentpage == totalpages
        const pageafterselectedpages = currentpage <= selectedpages + 2
        const pagebeforeselectedpages = currentpage >= selectedpages - 2

        if (firstandlastpage || pagebeforeselectedpages && pageafterselectedpages) {

            if (oldpage && currentpage - oldpage > 2) {
                pages.push("...")
            }

            if (oldpage && currentpage - oldpage == 2) {
                pages.push(oldpage + 1)
            }

            pages.push(currentpage)
            oldpage = currentpage

        }
    }

    return pages
}

function createpagination(pagination) {
    const filter = pagination.dataset.filter
    const page = +pagination.dataset.page
    const total = +pagination.dataset.total
    const pages = paginate(page, total)

    let elements = ""

    for (let page of pages) {
        if (String(page).includes("...")) {
            elements += `<span>${page}</span>`
        } else {
            if (filter) {
                elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
            } else {
                elements += `<a href="?page=${page}">${page}</a>`
            }

        }
    }

    pagination.innerHTML = elements
}


const pagination = document.querySelector(".pagination")

if (pagination) {
    createpagination(pagination)
}