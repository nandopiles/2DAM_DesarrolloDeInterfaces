//MONGO
const { MongoClient } = require('mongodb')
const recurso = 'http://127.0.0.1:8080/public/'
//cadena de conexión
const url = 'mongodb://localhost:27017'
//instanciar cliente de mongo
const client = new MongoClient(url)
//base de datos a usar
const dbName = 'formulario'

let collection
let clientes

async function basededatos() {
    await client.connect()  //es una promesa, espera a que se ejecute para continuar, se conecta a la base datos, si no existe la crea
    const db = client.db(dbName)   //que base de datos va a usar
    collection = db.collection('clientes')//que colección 'tabla' va a usar

    //recupero datos de preguntas
    clientes = await collection.find({}).toArray()
}

basededatos()
    .then(() => {
        console.log(clientes)
        const { dialog } = require('@electron/remote')
        // botones
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
        let posicion = 0


        let mostrar = () => {
            dni.value = clientes[posicion].dni
            nombre.value = clientes[posicion].nombre
            telefono.value = clientes[posicion].telefono
        }
        mostrar()

        primero.addEventListener("click", () => {
            posicion = 0
            mostrar()
        })

        siguiente.addEventListener("click", () => {
            if (posicion < clientes.length - 1) {
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
            posicion = clientes.length - 1
            mostrar()
        })

        borrar.addEventListener("click", async () => {
            await client.connect()
            let resultadoDelete = await collection.deleteOne({
                dni: clientes[posicion].dni,
                nombre: clientes[posicion].nombre,
                telefono: clientes[posicion].telefono
            })
            clientes.splice(posicion, 1) //borra el elemento del array que está en esa posición
            console.log("(+) Elemento posicion: " + posicion + " borrado")
            posicion--
            mostrar()
        })

        actualizar.addEventListener("click", async () => {
            await client.connect()
            let resultadoUpdate = await collection.updateOne(
                {
                    dni: clientes[posicion].dni,
                    nombre: clientes[posicion].nombre,
                    telefono: clientes[posicion].telefono
                },
                {
                    $set: {
                        dni: dni.value,
                        nombre: nombre.value,
                        telefono: tlf.value
                    }
                })
            clientes[posicion].dni = dni.value
            clientes[posicion].nombre = nombre.value
            clientes[posicion].telefono = tlf.value
            console.log("(+) Cliente Actualizado")
        })

        let insertarCliente = async () => {
            await client.connect()
            let newClient = {
                dni: dni.value,
                nombre: nombre.value,
                telefono: tlf.value
            }
            clientes.push(newClient)
            let insertResult = await collection.insertOne([newClient])
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
    })
    .catch(() => console.log("(-) Ha ido mal"))
    .finally(() => client.close())