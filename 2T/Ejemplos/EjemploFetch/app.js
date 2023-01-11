const fetch = require('node-fetch')
const recurso = "http://127.0.0.1:8080";
//Get para bienvenida:
fetch(recurso + '/bienvenida')
    .then(res => res.text())
    .then(body => console.log(body))

fetch(recurso + '/clientes')
    .then(res => res.json())
    .then(json => console.log(json))