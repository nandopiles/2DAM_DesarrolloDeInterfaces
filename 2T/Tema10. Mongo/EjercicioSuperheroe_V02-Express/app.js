const express = require('express');
let app = express();
app.use('/public', express.static(__dirname + '/public'));
console.log("Escuchando en http://127.0.0.1:8080");
app.listen(8080);
