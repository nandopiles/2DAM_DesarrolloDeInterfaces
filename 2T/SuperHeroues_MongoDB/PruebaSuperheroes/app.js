const { dialog } = require('@electron/remote')
const { MongoClient } = require('mongodb')
//cadena de conexión
const url = 'mongodb://localhost:27017'
//instanciar un mongoclient
const client = new MongoClient(url)
//base de datos a usar dentro de mongo
const dbName = 'sh'

let superheroes
let fichero

//find para obtener los superhéroes y los votos
let basededatos = async () => {
    await client.connect() //establece conexión
    const db = client.db(dbName) //qué bd va a usar, si no existe la crea
    //recupero superhéroes
    const collection = db.collection('superheroes') //que colección "tabla", se va a usar
    superheroes = await collection.find({}).toArray()
    console.log(superheroes)
    //recupero votos
    const collection2 = db.collection('votos')
    fichero = await collection2.find({}).toArray()
    console.log(fichero)
}

let insertarVoto = async (voto) => {
    await client.connect() //establece conexión
    const db = client.db(dbName) //qué bd va a usar, si no existe la crea
    const collection = db.collection('votos') //que colección "tabla", se va a usar
    let insertResult2 = await collection.insertOne(voto)
}

basededatos()
    .then(() => {
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

        const contSuper = new Array(superheroes.length)
        let posicion = 0
        let newArray = fichero

        /**
         * Inicializa un Array donde contará los votos de cada Superhéroe
         */
        let inicialize0 = () => {
            for (let i = 0; i < contSuper.length; i++) {
                contSuper[i] = 0
                console.log(i + ": " + contSuper[i])
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
            //insertar en la coleccion votos
            insertarVoto(insert)
                .then(() => console.log("Voto insertado"))
                .catch(() => console.log("Voto NO insertado"))
                .finally(() => client.close)
            console.log("(+) Voto almacenado")
            contSuper[posicion]++
            mostrarCantVotos()
            insert.value = ""
        })
    })
    .catch(() => console.log("Ha ido mal..."))
    .finally(() => client.close)