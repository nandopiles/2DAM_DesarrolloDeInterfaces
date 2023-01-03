
const { MongoClient } = require('mongodb');
const recurso = 'http://127.0.0.1:8080/public/';
//cadena de conexión
const url = 'mongodb://localhost:27017';
//instanciar cliente de mongo
const client = new MongoClient(url);
//base de datos a usar
const dbName = 'heores';
let sheros;
let votes;

//find para obtener superheroes y votos

async function basededatos() {
    await client.connect();   //es una promesa, espera a que se ejecute para continuar, se conecta a la base datos, si no existe la crea
    const db = client.db(dbName);   //que base de datos va a usar
    const collection = db.collection('superheroes');//que colección 'tabla' va a usar

    //FIND (SELECT)

    //recupero datos de heroes
    sheros = await collection.find({}).toArray();
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

basededatos().then(() => {


    let img = document.getElementById("img");
    let superhero = document.getElementById("superhero");
    let publisher = document.getElementById("publisher");
    let alter_ego = document.getElementById("alter_ego");
    let first_appearance = document.getElementById("first_appearance");
    let characters = document.getElementById("characters");
    let votante = document.getElementById("voter");
    let titulo = document.getElementById("titulo");

    let posicion = 0;

    let mostrar = (i) => {
        img.src = recurso + sheros[i].img;
        superhero.innerHTML = sheros[i].superhero;
        publisher.innerHTML = sheros[i].publisher;
        alter_ego.innerHTML = sheros[i].alter_ego;
        first_appearance.innerHTML = sheros[i].first_appearance;
        characters.innerHTML = sheros[i].characters;
    }

    mostrar(0);


    document.getElementById("btAnterior").addEventListener('click', () => {
        if (posicion == 0) {
            dialog.showErrorBox("Attention", "First Superhero")
        } else {
            posicion--;
            mostrar(posicion);
        }
    });

    document.getElementById("btSiguiente").addEventListener('click', () => {
        if (posicion == sheros.length - 1) {
            dialog.showErrorBox("Attention", "Last Superhero");
        } else {
            posicion++;
            mostrar(posicion);
        }
    });
    document.getElementById("btVotar").addEventListener('click', () => {
        let newVote = {};
        if (votante.value == "") {
            dialog.showErrorBox("Attention", "type your name");
        } else {
            //actualizo el vectro y el fichero de votos
            newVote = {
                id: posicion,
                voter: votante.value
            }
            votes.push(newVote)
            //insertar en la colección votos
            insertarvoto(newVote)
                .then(()=>console.log("voto insertado"))
                .catch(()=>console.log("voto no insertado"))
                .finally(()=>client.close());
            //calculo el superheroe más votado
            let maxVotes = 0;
            let idmax = 0;
            let vectorAux = [];
            for (let i = 0; i < sheros.length; i++) {
                vectorAux = votes.filter(function (v) {
                    return v.id == i;
                });
                if (maxVotes < vectorAux.length) {
                    maxVotes = vectorAux.length;
                    idmax = i;
                }
            }
            //actualizo la cabecera
            titulo.innerHTML = `the most voted superhero is ${sheros[idmax].superhero} with ${maxVotes} votes`;
        }
    });

})
    .catch(() => console.log("kk"))
    .finally(()=>client.close())