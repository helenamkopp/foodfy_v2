const currentPage = location.pathname
const menuItems = document.querySelectorAll(".links a")

for (item of menuItems ) {
    if(currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active")
    }
}

console.log(currentPage)

const PhotosUpload = {
    input: "",
    preview_profile: document.querySelector('#photo-profile-preview'),
    preview_recipe: document.querySelector('#photos-recipe-preview'),
    profileUploadLimit: 1,
    recipeUploadLimit: 5,
    files: [],
    handleFileInput(event) {
        const { files: fileList } = event.target
        PhotosUpload.input = event.target

        if (PhotosUpload.hasLimit(event)) return

        Array.from(fileList).forEach(file => {

            PhotosUpload.files.push(file)

            const reader = new FileReader()

            reader.onload = () => {
                const image = new Image()
                image.src = String(reader.result)

                const div = PhotosUpload.getContainer(image)

                PhotosUpload.preview_profile.appendChild(div)
            }

            reader.readAsDataURL(file)
        })

        PhotosUpload.input.files = PhotosUpload.getAllFiles()
    },
    handleFileInputRecipe(event) {
        const { files: fileList } = event.target
        PhotosUpload.input = event.target

        if (PhotosUpload.hasLimit(event)) return

        Array.from(fileList).forEach(file => {

            PhotosUpload.files.push(file)

            const reader = new FileReader()

            reader.onload = () => {
                const image = new Image()
                image.src = String(reader.result)

                const div = PhotosUpload.getContainer(image)

                PhotosUpload.preview_recipe.appendChild(div)
            }

            reader.readAsDataURL(file)
        })

        PhotosUpload.input.files = PhotosUpload.getAllFiles()
    },
    hasLimit(event) {
        const { profileUploadLimit, recipeUploadLimit, input, preview_profile, preview_recipe } = PhotosUpload
        const { files: fileList } = input

        if (preview_profile) {

            if (fileList.length > profileUploadLimit ) {
                alert(`Envie no máximo ${profileUploadLimit} fotos`)
                event.preventDefault()
                return true
            }

            const photosDiv = []
            preview_profile.childNodes.forEach(item => {
                if (item.classList && item.classList.value == "photo")
                    photosDiv.push(item)
            })

            const totalPhotos = fileList.length + photosDiv.length
            if ( totalPhotos > profileUploadLimit) {
                alert("Você atingiu o limite máximo de fotos")
                event.preventDefault()
                return true
            }
        }

        if (preview_recipe) {

            if (fileList.length > recipeUploadLimit) {
                alert(`Envie no máximo ${recipeUploadLimit} fotos`)
                alert.preventDefault()
                return true
            }

            const photosDiv = []
            preview_recipe.childNodes.forEach(item => {
                if (item.classList && item.classList.value == "photo")
                    photosDiv.push(item)
            })

            const totalPhotos = fileList.length + photosDiv.length
            if ( totalPhotos > recipeUploadLimit) {
                alert("Você atingiu o limite máximo de fotos")
                event.preventDefault()
                return true
            }

        }

        return false
    },
    getAllFiles() {
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()
        PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files
    },
    getContainer(image) {
        const div = document.createElement('div')
        div.classList.add('photo')

        div.onclick = PhotosUpload.removePhoto

        div.appendChild(image)

        div.appendChild(PhotosUpload.getRemoveButton())

        return div
    },
    getRemoveButton() {
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = "delete"
        return button
    },
    removePhoto(event) {
        const photoDiv = event.target.parentNode
        
        if (PhotosUpload.preview_profile) {
            const photosArray = Array.from(PhotosUpload.preview_profile.children)

            const index = photosArray.indexOf(photoDiv)

            PhotosUpload.files.splice(index, 1)
            PhotosUpload.input.files = PhotosUpload.getAllFiles()

            photoDiv.remove()
        }

        if (PhotosUpload.preview_recipe) {
            const photosArray = Array.from(PhotosUpload.preview_recipe.children)

            const index = photosArray.indexOf(photoDiv)

            PhotosUpload.files.splice(index, 1)
            PhotosUpload.input.files = PhotosUpload.getAllFiles()

            photoDiv.remove()
        }
        
    },
    removeOldPhotos(event) {
        const photoDiv = event.target.parentNode

        if (photoDiv.id) {
            const removedFiles = document.querySelector('input[name="removed_files"]')
            if (removedFiles) {
                removedFiles.value += `${photoDiv.id},`
            }
        }

        photoDiv.remove()
    }
}

const AddItems = {
    addIngredient(event) {

        const ingredients = document.querySelector('#ingredients')
        const fieldContainer = document.querySelectorAll('.ingredient')

        const newField = fieldContainer[fieldContainer.length -1].cloneNode( true )

        if(newField.children[0].value == "") return false

        newField.children[0].value = ""
        ingredients.appendChild(newField)

    },
    addPreparation(event) {

        const preparations = document.querySelector('#preparations')
        const fieldContainer = document.querySelectorAll('.preparation')

        const newField = fieldContainer[fieldContainer.length -1].cloneNode( true )

        if(newField.children[0].value == "") return false

        newField.children[0].value = ""
        preparations.appendChild(newField)

    }
}

const ImageGallery = {

    hightlight: document.querySelector('.gallery .highlight > img'),
    previews: document.querySelectorAll('.gallery-preview img'),
    setImage(e) {
        const { target } = e

        ImageGallery.previews.forEach(preview => preview.classList.remove('active'))
        
        target.classList.add('active')

        ImageGallery.hightlight.src = target.src
        Lightbox.image.src = target.src
    }
}

const Lightbox = {
    target: document.querySelector('.lightbox-target'),
    image: document.querySelector('.lightbox-target img'),
    closeButton: document.querySelector('.lightbox-target a.lightbox-close'),
    open() {
        Lightbox.target.style.opacity = 1
        Lightbox.target.style.top = 0
        Lightbox.target.style.bottom = 0
        Lightbox.closeButton.style.top = 0
    },
    close() {
        Lightbox.target.style.opacity = 0
        Lightbox.target.style.top = "-100%"
        Lightbox.target.style.bottom = "initial"
        Lightbox.closeButton.style.top = "-80px"
    }
}