const { dialog } = require('@electron/remote')

let photo = document.getElementById("photo")
let lista = document.getElementById("lista")
let anterior = document.getElementById("anterior")
let siguiente = document.getElementById("siguiente")

const libros = require("./data/libros.json")
let posicion = 0

let mostrar = (i) => {
    let cad = `
    <h1>Título: ${libros[i].title}</h1>
    <h1>Autor: ${libros[i].author}</h1>
    <h1>Precio: ${libros[i].price}</h1>
    <h1>Reseña</h1>
    <p>${libros[i].resenya}</p>`
    return cad
}

lista.innerHTML = mostrar(posicion)
photo.innerHTML = `<img class="photos" src="./img/${libros[posicion].img}">`

anterior.addEventListener('click', () => {
    if (posicion > 0) {
        lista.innerHTML = mostrar(--posicion)
        photo.innerHTML = `<img class="photos" src="./img/${libros[posicion].img}">`
    } else {
        console.log("(-) Fuera de Rango")
        dialog.showErrorBox("Atención", "Primer libro")
    }
})

siguiente.addEventListener('click', () => {
    if (posicion < libros.length - 1) {
        lista.innerHTML = mostrar(++posicion)
        photo.innerHTML = `<img class="photos" src="./img/${libros[posicion].img}">`
    } else {
        console.log("(-) Fuera de Rango")
        dialog.showErrorBox("Atención", "Último libro")
    }
})