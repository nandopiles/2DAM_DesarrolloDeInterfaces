const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

//cadena de conexión
const url = 'mongodb://localhost:27017';
//instanciar cliente de mongo
const client = new MongoClient(url);
//base de datos a usar
const dbName = 'heores';
let sheros;
let votes;
//find para obtener superheroes y votos

async function getsh() {
    await client.connect();   //es una promesa, espera a que se ejecute para continuar, se conecta a la base datos, si no existe la crea
    const db = client.db(dbName);   //que base de datos va a usar
    const collection = db.collection('superheroes');//que colección 'tabla' va a usar

    //FIND (SELECT)

    //recupero datos de heroes
    sheros = await collection.find({}).toArray();

}

async function getvotes() {
    await client.connect();   //es una promesa, espera a que se ejecute para continuar, se conecta a la base datos, si no existe la crea
    const db = client.db(dbName);   //que base de datos va a usar
    //FIND (SELECT)

    //recupero datos de votos
    const collection1 = db.collection('votos');
    votes = await collection1.find({}).toArray();
}

async function insertarvoto(voto) {
    await client.connect();   //es una promesa, espera a que se ejecute para continuar, se conecta a la base datos, si no existe la crea
    const db = client.db(dbName);   //que base de datos va a usar
    const collection = db.collection('votos');//que colección 'tabla' va a usar

    let insertResult1 = await collection.insertOne(voto);
}


let app = express();
app.unsubscribe(bodyParser.json()) //cuando haya que parsear lo hará con bodyParser
//poner a disposicion del mundo la carpeta public
app.use('/public', express.static(__dirname + '/public'));

// Devolver los superheroes
app.get('/sh', (req, res) => {
    //leer de Mongo la coleccion superheroes
    getsh()
        .then(() => {
            //hacer efectiva la entrega
            res.send(sheros);
        })
        .catch(() => {
            res.send("no va master");
        })
        .finally(() => { client.close() });

});

// Devolver los votos
app.get('/votes', (req, res) => {
    //leer de Mongo la coleccion superheroes
    getvotes()
        .then(() => {
            //hacer efectiva la entrega
            res.send(votes);
        })
        .catch(() => {
            res.send("no va master");
        })
        .finally(() => { client.close() });

});

app.post('/votes', (req, res) => {
    try {
        let newVote = req.body;
        insertarvoto(newVote)
            .then(() => {
                res.send({ok: 'BIEN'});
            })
            .catch(() => {
                res.send({ok: 'MAL'});
            })
            .finally(() => { client.close() });
    } catch (error) {
        res.send({ok: 'MAL'})
    }
});


console.log("Escuchando en http://127.0.0.1:8080");
app.listen(8080);
