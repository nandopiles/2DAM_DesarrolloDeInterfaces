let datos = [
    { nombre: "Nacho", telefono: "966112233", edad: 40 },
    { nombre: "Ana", telefono: "911223344", edad: 35 },
    { nombre: "Mario", telefono: "611998877", edad: 15 },
    { nombre: "Laura", telefono: "633663366", edad: 17 }
];
console.log(datos[1].telefono);

//crea un array con las edades de las personas
let ndatos = datos.map(function (a) {
    return a.edad;
});
//ordenamos de menor a mayor las edades
datos.sort(function (n1, n2) {
    return n1.edad - n2.edad;
});

//imprimimos por pantalla el nombre de la persona más mayor
console.log("El mayor es " + datos[datos.length - 1].nombre);