const express = require('express');
const bodyParser = require('body-parser');
const os= require('os');
const fs = require('fs'); //para acceder a los ficheros

let app = express(); //cargamos express

// Body-parser para procesar datos JSON desde el cuerpo de las peticiones POST/PUT
app.use(bodyParser.json());

//definimos una ruta: http://localhost:8080/bienvenida

//y una respuesta a esa ruta:"

app.get('/bienvenida1', (req, res) => {
    res.send('Hola,bienvenido/a');
});

app.get('/bienvenida2', (req, res) => {
    //leer bienvenida del archivo
    let fichero = fs.readFileSync('./variable.json');
    let mensaje = JSON.parse(fichero);
    res.send(mensaje);
});


app.get('/hostname', (req, res) => {
    res.send(os.hostname);
});




app.listen(8080);