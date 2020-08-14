    const showHides = document.getElementsByClassName("topic")
    for (let showHide of showHides ) {
        showHide.addEventListener("click", function(){
            const topic_title = showHide.querySelectorAll("h4");
            const topic_content = showHide.getElementsByClassName("topic-content");
            if(topic_title[0].textContent === 'MOSTRAR'){
                topic_title[0].textContent = 'ESCONDER';
                topic_content[0].classList.add('show');
                topic_content[0].classList.remove('hide');
            }else{
                topic_title[0].textContent = 'MOSTRAR';
                topic_content[0].classList.add('hide');
                topic_content[0].classList.remove('show');
            }
        })
    }

const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .links a")

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}
