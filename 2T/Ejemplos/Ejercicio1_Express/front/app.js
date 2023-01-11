const fetch = require('node-fetch')
const recurso = "http://127.0.0.1:8080"

let imagenes = document.getElementById("imagenes")
let cad = ""

//Get para libros
fetch(recurso + '/libros')
    .then(res => res.json())
    .then(json => generarLibros(json))

let generarLibros = (libros) => {
    cad += `<img src='${libros}' alt='portadaLibro'>`
}