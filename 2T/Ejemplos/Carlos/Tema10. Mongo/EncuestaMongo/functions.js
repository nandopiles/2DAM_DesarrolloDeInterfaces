const { MongoClient } = require('mongodb')
const recurso = 'http://127.0.0.1:8080/public/'
//cadena de conexión
const url = 'mongodb://localhost:27017'
//instanciar cliente de mongo
const client = new MongoClient(url)
//base de datos a usar
const dbName = 'encuestas'

let preguntas

async function basededatos() {
    await client.connect()  //es una promesa, espera a que se ejecute para continuar, se conecta a la base datos, si no existe la crea
    const db = client.db(dbName)   //que base de datos va a usar
    const collection = db.collection('preguntas')//que colección 'tabla' va a usar

    //recupero datos de preguntas
    preguntas = await collection.find({}).toArray()
}

basededatos()
    .then(() => {
        let header = document.getElementById("header")
        let contenedorGeneral = document.getElementById("contenedorGeneral")
        let btnComprobar = document.getElementById("btnComprobar")

        let cad = ""

        let mostrar = (e, i) => {
            cad += `
            <div>
                <img class="photo" src="./img/${i + 1}.png" alt="Num Pregunta">
                <b>${e.pregunta}</b><br>
                <input type="radio" id="r1${i}" name="radios${i + 1}" value="a" > ${e.rA}<br>`
            cad += `<input type="radio" id="r2${i}" name="radios${i + 1}" value="b" > ${e.rB}<br>`
            cad += `<input type="radio" id="r3${i}" name="radios${i + 1}" value="c" > ${e.rC}<br>
            </div>
            <hr>`
        }

        console.log(preguntas)
        preguntas.forEach((e, i) => {
            mostrar(e, i)
        })
        contenedorGeneral.innerHTML = cad

        btnComprobar.addEventListener('click', () => {
            let aciertos = 0
            let fallos = 0

            for (let i = 0; i < preguntas.length; i++) {
                let r1 = document.getElementById("r1" + i)
                let r2 = document.getElementById("r2" + i)
                let r3 = document.getElementById("r3" + i)
                console.log(r1.value)
                console.log(r2.value)
                console.log(r3.value)
                let correcta = preguntas[i].correcta
                if (r1.checked) {
                    if (r1.value === correcta)
                        aciertos++
                    else
                        fallos++
                }
                if (r2.checked) {
                    if (r2.value === correcta)
                        aciertos++
                    else
                        fallos++
                }
                if (r3.checked) {
                    if (r3.value === correcta)
                        aciertos++
                    else
                        fallos++
                }
                console.log(aciertos, fallos)
                header.innerHTML = "Aciertos: " + aciertos + "| Fallos: " + fallos
            }
        })
    })
    .catch(() => console.log("(-) Ha ido mal"))
    .finally(() => client.close())