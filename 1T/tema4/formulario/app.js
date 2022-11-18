// botones
const { dialog } = require('@electron/remote')
let primero = document.getElementById("primero");
let siguiente = document.getElementById("siguiente")
let anterior = document.getElementById("anterior")
let ultimo = document.getElementById("ultimo")
let borrar = document.getElementById("borrar")
let actualizar = document.getElementById("actualizar")
let insertar = document.getElementById("insertar")
// Inserts
let dni = document.getElementById("dni")
let nombre = document.getElementById("nombre")
let tlf = document.getElementById("telefono")

//_________________________
const fs = require('fs');
let fichero = fs.readFileSync('./clientes.json');
let vclientes = new Array()
let posicion = 0

vclientes = JSON.parse(fichero); //devuelve un array del fichero JSON

let mostrar = () => {
    dni.value = vclientes[posicion].dni
    nombre.value = vclientes[posicion].nombre
    telefono.value = vclientes[posicion].telefono
}

primero.addEventListener("click", () => {
    posicion = 0
    mostrar()
})

siguiente.addEventListener("click", () => {
    if (posicion < vclientes.length - 1) {
        posicion++
        mostrar()
    } else {
        console.log("(-)fuera de rango")
        dialog.showErrorBox("Atención", "Último cliente")
    }
})

anterior.addEventListener("click", () => {
    if (posicion > 0) {
        posicion--
        mostrar()
    } else {
        console.log("(-)fuera de rango")
        dialog.showErrorBox("Atención", "Primer cliente")
    }
})

ultimo.addEventListener("click", () => {
    posicion = vclientes.length - 1
    mostrar()
})

borrar.addEventListener("click", () => {
    vclientes.splice(posicion, 1) //borra el elemento del array que está en esa posición
    fs.writeFileSync("./clientes.json", JSON.stringify(vclientes))
    console.log("(+) Elemento posicion: " + posicion + " borrado")
})

actualizar.addEventListener("click", () => {
    vclientes[posicion].dni = dni.value
    vclientes[posicion].nombre = nombre.value
    vclientes[posicion].telefono = tlf.value
    fs.writeFileSync("./clientes.json", JSON.stringify(vclientes))
    console.log("(+) Cliente Actualizado")
})

let insertarCliente = () => {
    let insert = {
        dni: dni.value,
        nombre: nombre.value,
        telefono: tlf.value
    }
    vclientes.push(insert)
    fs.writeFileSync("./clientes.json", JSON.stringify(vclientes))
    console.log("(+) Cliente Insertado")
}

let controlInsertar = false;
insertar.addEventListener('click', () => {
    if (controlInsertar == false) {
        dni.value = ""
        nombre.value = ""
        tlf.value = ""
        insertar.classList.remove("btn-primary")
        insertar.classList.add("btn-negative")
        controlInsertar = true
    } else {
        insertarCliente()
        insertar.classList.remove("btn-negative")
        insertar.classList.add("btn-primary")
        controlInsertar = false
    }
})