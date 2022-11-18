let datos = [
    { nombre: "Nacho", telefono: "966112233", edad: 40 },
    { nombre: "Ana", telefono: "911223344", edad: 35 },
    { nombre: "Mario", telefono: "611998877", edad: 15 },
    { nombre: "Laura", telefono: "633663366", edad: 17 }
];

console.log("añadir 2 datos:");
datos.push(
    { nombre: "Pedro", telefono: "611944444", edad: 25 },
    { nombre: "Julia", telefono: "633232323", edad: 37 }
);
console.log(datos);

console.log("ordenar los datos por edad:")
datos.sort(function (n1, n2) {
    return n1.edad - n2.edad;
});
console.log(datos);

console.log("ordenar los datos por nombre:");
datos.sort((a,b) => a.nombre.localeCompare(b.nombre));
console.log(datos);

console.log("nuevo vector con datos de más de 30 años");
let mas30 = datos.filter(function(num){
    return num.edad > 30;
});
console.log(mas30);