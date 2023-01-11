const { MongoClient } = require('mongodb')

//cadena de conexión
const url = 'mongodb://localhost:27017'
//instanciar un mongoclient
const client = new MongoClient(url)
//base de datos a usar dentro de mongo
const dbName = 'contactos'

let basededatos = async () => {
    await client.connect() //establece conexión
    const db = client.db(dbName) //qué bd va a usar, si no existe la crea
    const collection = db.collection('clientes') //que colección "tabla", se va a usar
    //INSERT
    /*let contacto1 = {
        nombre: "Nando",
        telefono: "123456789",
        edad: 20
    }
    let contacto2 = {
        nombre: "Mario",
        telefono: "987654321",
        edad: 19
    }
    let insertResult = await collection.insertMany([contacto1, contacto2])
    console.log('Resultado insert: ' + insertResult)*/

    //FIND (SELECT)
    //let resultadoFind = await collection.find({}).toArray
    /*let resultadoFind = await collection.find({nombre: "Nando"}).toArray()
    console.log(resultadoFind[0].nombre)*/

    //UPDATE, solo un elemento
    /*let resultadoUpdate = await collection.updateOne({ nombre: "Nando" },
        { $set: { nombre: "Hugo", telefono: "112" } })*/

    //DELETE
    let resultadoDelete = await collection.deleteOne({nombre: "Mario"})
}
//ejecución
basededatos()
    .then(() => console.log("Ha ido bien"))
    .catch(() => console.log("Ha ido mal"))
    .finally(() => client.close())