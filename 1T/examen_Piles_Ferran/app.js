const { dialog } = require('@electron/remote')
let cabecera = document.getElementById("cabecera")
let foto = document.getElementById("foto")
let infoPelicula = document.getElementById("info")
let fotoSuper = document.getElementById("fotoSuper")
let boton = document.getElementById("boton")

let peliculas = require("./data/movies.json")

let posicion = 0
let infoFormada = ""

let mostrarCabecera = (i) => {
    let cad = `
        <h1 class="centrarVertical text">${peliculas[i].title}</h1>
        <span class="icon icon-ccw text" align="left">${peliculas[i].date}-${peliculas[i].hours}h:${peliculas[i].minutes}m</span>
        <span class = "text" align="right">rating ${peliculas[i].rating}/11</span>
    `
    return cad
}

let mostrarInfo = (i) => {
    let cad = `    
            <li class="text">${peliculas[posicion].genres[i]}</li>
    `
    return cad
}

let descripcion = (i) => {
    let cad = `
    <p class="text">${peliculas[i].description}</p><hr>
    `
    return cad
}
let mostrar = () => {
    cabecera.innerHTML = mostrarCabecera(posicion)
    infoFormada = ""
    infoFormada += "<ul>"
    for (let i = 0; i < peliculas[posicion].genres.length; i++) {
        infoFormada += mostrarInfo(i)
    }
    infoFormada += "</ul><hr>"
    infoFormada += descripcion(posicion)
    infoPelicula.innerHTML = infoFormada
}

mostrar()

let palante = true

document.getElementById("fotoSuper").addEventListener('click', () => {
    if (palante && posicion < peliculas.length - 1) {
        let newSrc = "./img/" + ++posicion + ".jpg"
        fotoSuper.setAttribute("src", newSrc)
        mostrar()
        if (posicion == peliculas.length - 1) {
            dialog.showErrorBox("Atención", "Última Película")
            palante = false
        }
    } else {
        let newSrc = "./img/" + --posicion + ".jpg"
        fotoSuper.setAttribute("src", newSrc)
        mostrar()
        if (posicion == 0) {
            dialog.showErrorBox("Atención", "Primera Película")
            palante = true
        }
    }
})

boton.addEventListener('click', () => {
    window.open(`${peliculas[posicion].website}`);
})