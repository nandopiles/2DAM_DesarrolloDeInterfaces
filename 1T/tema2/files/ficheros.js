//cargar módulo fs
const fs = require("fs");
//leer clientes del archivo
let fichero = fs.readFileSync("./clientes.json");
console.log(fichero); //FORMATO JSON, NO TEXTO    
//array para manipular los datos
//parseamos el fichero en formato json
//ahora en el array clientes tendremos un vector
//donde en cada posición del vector hay un objeto
//con los datos de un cliente
let contenidoFichero = JSON.parse(fichero);
contenidoFichero.listaClientes[0].nombre = "Jonny";
fs.writeFileSync("./clientes.json", JSON.stringify(contenidoFichero)); //pasar de formato JSON a texto no legible
console.log(contenidoFichero.listaClientes[0].nombre);
