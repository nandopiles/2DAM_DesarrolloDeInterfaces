const { MongoClient } = require('mongodb')
let datosSh = require("./data/superheroes.json")
let votesSh = require("./data/votes.json")

//cadena de conexión
const url = 'mongodb://localhost:27017'
//instanciar un mongoclient
const client = new MongoClient(url)
//base de datos a usar dentro de mongo
const dbName = 'sh'

let basededatos = async () => {
    await client.connect() //establece conexión
    const db = client.db(dbName) //qué bd va a usar, si no existe la crea
    const collection = db.collection('superheroes') //que colección "tabla", se va a usar

    /*let insertResult = await collection.insertMany(datosSh)
    console.log('Resultado insert: ' + insertResult)*/

    const collection2 = db.collection('votos')
    let insertResult2 = await collection2.insertMany(votesSh)
    console.log('Resultado insert: ' + insertResult2)
}
//ejecución
basededatos()
    .then(() => console.log("Ha ido bien"))
    .catch(() => console.log("Ha ido mal"))
    .finally(() => client.close())