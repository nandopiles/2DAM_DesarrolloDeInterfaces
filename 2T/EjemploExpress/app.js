const express = require('express')
let app = express() //cargamos express
//definimos una ruta: http://localhost:8080/bienvenida
//y una respuesta a esa ruta: mensaje "Hola, bienvenido/a"
app.get('/bienvenida', (req, res) => {
    res.send('Me gusta la Gasolina')
})
app.get("/aw", (req, res) => {
    res.send("Vinga Aw")
})
// Servicio de listado por todos
app.get('/clientes', (req, res) => {
    //leer clientes del archivo
    let clientes = require("./clientes.json")
    res.send(clientes)
})
app.use('/public', express.static(__dirname + '/public'))
//iniciamos el servicio en el puerto 8080
app.listen(8080)