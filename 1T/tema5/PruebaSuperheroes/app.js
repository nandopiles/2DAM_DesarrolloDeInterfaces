const { dialog } = require('@electron/remote')
/**
 * Enlaces
 */
let lista = document.getElementById("lista")
let foto = document.getElementById("fotoSuperheroe")
let nombre = document.getElementById("nombre")
let btnVotar = document.getElementById("votar")
let siguiente = document.getElementById("siguiente")
let anterior = document.getElementById("anterior")
let cabecera = document.getElementById("cabecera")
/**
 * Variables internas
 */
const superheroes = require("./data/superheroes.json")
const contSuper = new Array(superheroes.length)
let posicion = 0
const fs = require('fs')
let fichero = fs.readFileSync('./data/votes.json')
let newArray = JSON.parse(fichero)

/**
 * Inicializa un Array donde contará los votos de cada Superhéroe
 */
let inicialize0 = () => {
    for (let i = 0; i < contSuper.length; i++) {
        contSuper[i] = 0
        console.log(i+ ": " + contSuper[i])
    }
}
inicialize0()

/**
 * Creará una tabla con la información cogida de nuestro json
 * @param {} i 
 * @returns cadena formada lista para imprimir
 */
let mostrar = (i) => {
    let cad = `
    <table class="table-striped">
        <tr>
            <td>superhero:</td>
            <td>${superheroes[i].superhero}</td>
        </tr>
        <tr>
            <td>publisher:</td>
            <td>${superheroes[i].publisher}</td>
        </tr>
        <tr>
            <td>alter Ego:</td>
            <td>${superheroes[i].alter_ego}</td>
        </tr>
        <tr>
            <td>first appearance:</td>
            <td>${superheroes[i].first_appearance}</td>
        </tr>
        <tr>
            <td>characters:</td>
            <td>${superheroes[i].characters}</td>
        </tr>  
    </table>`
    return cad
}

/**
 * Muestra la primera posición del json (info y foto)
 */
lista.innerHTML = mostrar(posicion)
foto.innerHTML = `<img class="photos" src="./img/${superheroes[posicion].img}">`

/**
 * Pasar al siguiente superhéroe (info, foto)
 */
siguiente.addEventListener("click", () => {
    if (posicion < superheroes.length - 1) {
        lista.innerHTML = mostrar(++posicion)
        foto.innerHTML = `<img class="photos" src="./img/${superheroes[posicion].img}">`
    } else {
        console.log("(-) fuera de rango")
        dialog.showErrorBox("Atención", "Último superheroe")
    }
})

/**
 * Ir al anterior superhéroe (info, foto)
 */
anterior.addEventListener("click", () => {
    if (posicion > 0) {
        lista.innerHTML = mostrar(--posicion)
        foto.innerHTML = `<img class="photos" src="./img/${superheroes[posicion].img}">`
    } else {
        console.log("(-) fuera de rango")
        dialog.showErrorBox("Atención", "Primer superheroe")
    }
})

/**
 * Muestra el superhéroe con más votos
 */
let mostrarCantVotos = () => {
    let votos = 0
    let id = 0

    for (let i = 0; i < contSuper.length; i++) {
        if (contSuper[i] > votos) {
            votos = contSuper[i]
            id = i
        }
    }
    cabecera.innerHTML = "the most voted superhero is " + superheroes[id].superhero + " whith " + Number(votos) + " votes"
}

/**
 * Realiza un voto guardando la info del nombre de la persona y a qué superhéroe
 */
btnVotar.addEventListener("click", () => {
    let insert = {
        id: superheroes[posicion].id,
        voter: nombre.value
    }
    newArray.push(insert)
    fs.writeFileSync("./data/votes.json", JSON.stringify(newArray))
    console.log("(+) Voto almacenado")
    contSuper[posicion]++
    mostrarCantVotos()
    insert.value = ""
})