const { dialog } = require('@electron/remote');
const fetch = require('node-fetch');
const recurso = "http://127.0.0.1:8080";
const recurso1 = 'http://127.0.0.1:8080/public/';

let sheros;
let votes;

//Get para superheroes:
fetch(recurso + '/sh')
    .then(res => res.json())
    .then(json => {
        console.log(json)
        sheros = json;
        inicio();
    });

//Get para votos:
fetch(recurso + '/votes')
    .then(res => res.json())
    .then(json => {
        console.log(json)
        votes = json;
    });

let inserta = (voto) => {
    fetch(recurso + '/votes', {
        method: 'post',
        body: JSON.stringify(voto),
        headers:{'Content-Type':'application/json'}
    })
    .then(res => res.json)
    .then(json => console.log(json))
}

    let inicio = () => {

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
            img.src = recurso1 + sheros[i].img;
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
                inserta(newVote)
                /*
                insertarvoto(newVote)
                    .then(() => console.log("voto insertado"))
                    .catch(() => console.log("voto no insertado"))
                    .finally(() => client.close());
                */
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

    };

