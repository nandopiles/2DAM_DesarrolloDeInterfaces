const fs = require('fs');
//cargamos moongose
const mongoose = require('mongoose');
//establecemos el motor de promesa por defecto en javascript
//esto es necesario pq mongo admite distintos tipos de promesas
mongoose.Promise = global.Promise;

let fichero= fs.readFileSync('./peliculas.json');
let peliculas= JSON.parse(fichero);
//conectar con la BD contactos
mongoose.connect('mongodb://localhost:27017/pelisExamen', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


//esquema
let peliculaSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true //para quitar los espacios al final
    },
    nombre: {
        type: String,
        required: true,
        minlength: 1,
        trim: true //para quitar los espacios al final
    },
    director: {
        type: String,
        required: true,
        minlength: 1,
        trim: true //para quitar los espacios al final
    },
    clasificacion: {
        type: String,
        required: true,
        minlength: 1,
        trim: true //para quitar los espacios al final
    }

});


//modelo
let Pelicula = mongoose.model('pelisExamen', peliculaSchema); //asociamos el esquema al modelo

//solo se hace una vez ya que es para añadir los libros
/*
peliculas.forEach(movie => {

    let pel= new Pelicula();
    pel.id= movie.id;
    pel.nombre= movie.nombre;
    pel.director= movie.director;
    pel.clasificacion= movie.clasificacion;

    pel.save().then(resultado => {
        console.log("Pelicula añadida:", resultado);
       }).catch(error => {
           console.log("ERROR añadiendo pelicula:", error);
           
       });
    
});*/

const representaPeliculas = (movies=> {
    let cadenaDOM = "";
    movies.forEach(movie => {
        cadenaDOM +=
            `<div>
            <br>
            <x-label><strong>${movie.id}</strong></x-label>
            <br>
            <label>${movie.nombre}</x-label>
            <br>
            <label>${movie.director}</x-label>
            <br>
            <label>${movie.clasificacion}</x-label>
        
    </div>`;
            
    });
    document.getElementById("wrapper").innerHTML = cadenaDOM;
});

representaPeliculas();