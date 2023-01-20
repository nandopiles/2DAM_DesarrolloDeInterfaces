const { MongoClient } = require("mongodb");
const uri =
    "mongodb+srv://admin:admin@nutgod.adcito8.mongodb.net/test"

//"mongodb+srv://admin:admin@nutgod.adcito8.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri);

async function run() {
    try {
        const database = client.db('Formulario');
        const usersCollection = database.collection('clientes');

        const projection = { _id: 0, dni: 1, nombre: 1 }
        const cursor = await usersCollection.find({}).project(projection);
        await cursor.forEach(console.dir)
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

run().catch(console.dir);