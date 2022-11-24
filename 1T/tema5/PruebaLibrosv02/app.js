/**
 * Enlaces
 */
let btnMostrar = document.getElementById("mostrar")
let contenedorDesplegable = document.getElementById("desplegable")
let infoLibros = document.getElementById("infoLibros")
/**
 * Var internas
 */
const fs = require('fs')
const { title } = require('process')
let libros = require("./data/books.json")
let fichero = fs.readFileSync('./data/books.json')
libros = JSON.parse(fichero)

let newLibros = new Array()
let estado = 0
let i = 0
let tablaFormada = ""
let thisIsLibro = true


/**
 * Crea la primera parte de la tabla
 * @returns 
 */
let mostrarTabla = () => {
    let cad = `
    <p class="title center">Lista libros</p>
    <table class="table-striped">
        <thead>
            <tr>
                <th>Título</th>
                <th>Portada</th>
            </tr>
        </thead>
        <tbody>`
    return cad
}

/**
 * Completa la tabla añadiendo todos los libros del json
 * @param {*} i 
 * @returns 
 */
let mostrarLibros = (i) => {
    let cad = `
   
    <tr id="fotoTabla${i}">
        <td id="libroSeleccionado">${libros[i].title}</td>
        <td><img src="./img/${libros[i].img}" class="circularPhoto" alt="portadaCircular"></td>
    </tr>`
    return cad
}

/**
 * Unimos toda la composición de la tabla y la printeamos
 */

tablaFormada = mostrarTabla()
for (let i = 0; i < libros.length; i++) {
    tablaFormada += mostrarLibros(i)
}
tablaFormada += "</tbody></table>"
infoLibros.innerHTML = tablaFormada


for (let i = 0; i < libros.length; i++) {
    document.getElementById("fotoTabla" + i).addEventListener('click', () => {
        if (estado == 1) {
            contenedorDesplegable.innerHTML = mostrarDesplegable(i)
        }
    })
}

/**
 * Checkear la opción de si es un Libro o un Cómic
 * @param {*} i 
 * @returns 
 */
let esLibro = (i) => {
    let cad = ""

    if (libros[i].eslibro) {
        cad = `<div class="radio">
            <label>
                <input type="radio" name="radios" id="btnIsLibro" checked>
                Libro
            </label>
        </div>
        <div class="radio">
            <label>
                <input type="radio" name="radios">
                Comic
            </label>
        </div>`
        thisIsLibro = true
    } else {
        cad = `<div class="radio">
            <label>
                <input type="radio" name="radios">
                Libro
            </label>
        </div>
        <div class="radio">
            <label>
                <input type="radio" name="radios" id="btnIsComic" checked>
                Comic
            </label>
        </div>`
        thisIsLibro = false
    }
    return cad
}

/**
 * Crea un pequeño panel con detalles del Libro
 * @returns 
 */
let mostrarDesplegable = (i) => {
    let cad = `
    <div class="pane-sm sidebar">
        <p class="center">Detalle de un libro</p>
        <img src="./img/${libros[i].img}" class="photo" alt="portadaGrande">
        <p>Título</p>
        <input type="text" value="${libros[i].title}" class="form-control" id="titulo">
        <p>Autor</p>
        <input type="text" value="${libros[i].author}" class="form-control" id="autor">
        <p>Precio</p>
        <input type="number" value="${libros[i].price}" class="form-control" id="precio">
        `
    cad += esLibro(i)
    cad += `<button class="btn btn-primary" id="actualizar">
                Actualizar
            </button>
        </div>`
    return cad
}

/**
 * Muestra o oculta el panel del lado
 */
btnMostrar.addEventListener('click', () => {
    if (estado == 0) {
        contenedorDesplegable.innerHTML = mostrarDesplegable(0)
        estado = 1

        let btnActualizar = document.getElementById("actualizar")
        btnActualizar.addEventListener("click", () => {
            if (thisIsLibro) {
                let libroCheck = document.getElementById("btnIsLibro")
            } else {
                let comicCheck = document.getElementById("btnIsComic")
            }
            newLibros[i].title = titulo.value
            newLibros[i].author = autor.value
            newLibros[i].price = precio.value
            if (libroCheck.value) {
                newLibros[i].eslibro = true
            } else if (comicCheck.value) {
                newLibros[i].eslibro = false
            }
            console.log(newLibros[i].title + " " + newLibros[i].author + " " + newLibros[i].price)
            fs.writeFileSync("./data/books.json", JSON.stringify(newLibros))
            console.log("(+) Libro Actualizado")
        })
    } else {
        desplegable.innerHTML = ""
        estado = 0
    }
})