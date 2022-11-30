let datos = [
    { nombre: "Nacho", telefono: "966112233", edad: 40 },
    { nombre: "Ana", telefono: "911223344", edad: 35 },
    { nombre: "Mario", telefono: "611998877", edad: 15 },
    { nombre: "Laura", telefono: "633663366", edad: 17 }
]

let matchTlf = (tlf) => {
    let match = datos.filter(persona => persona.telefono === tlf)
    if (match.length != 0) {
        return true
    } else {
        false
    }
}

let nuevaPersona = (insert) => {
    
    datos.push(insert)
}

let borrarPersona = (tlf) => {
    datos = datos.filter(persona => persona.telefono != tlf)
}

nuevaPersona({nombre: "Juan", telefono:"965661564", edad: 60})
nuevaPersona({nombre: "Rodolfo", telefono:"910011001", edad: 20})
console.log("Inserción Juan y Rodolfo:")
console.log(datos)
borrarPersona("965661564")
console.log("Borrado de tlf 965661564")
console.log(datos)