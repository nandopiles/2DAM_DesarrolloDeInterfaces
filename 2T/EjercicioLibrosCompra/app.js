//MONGO
const { MongoClient } = require('mongodb')
//cadena de conexión
const url = 'mongodb+srv://admin:admin@nutgod.adcito8.mongodb.net'
//instanciar cliente de mongo
const client = new MongoClient(url)
//base de datos a usar
const dbName = 'EjercicioLibros'

let collection
let libros

async function run() {
    await client.connect()
    const db = client.db(dbName)
    collection = db.collection('libros')

    //recupero datos de libros
    libros = await collection.find({}).toArray()
}

let mostrar = () => {
    
}

run()
    .then(() => {

    })
