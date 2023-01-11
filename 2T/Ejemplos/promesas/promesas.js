let datos = [
    { nombre: "Nacho", telefono: "966112233", edad: 20 },
    { nombre: "Ana", telefono: "911223344", edad: 35 },
    { nombre: "Mario", telefono: "611998877", edad: 10 },
    { nombre: "Laura", telefono: "633663366", edad: 17 }
]

/**
 * Primera forma de definir Promesas
 */
let promesaMayoresDeEdad1 = new Promise((resolve, reject) => {
    let resultado = datos.filter(persona => persona.edad >= 18);
    if (resultado.length > 0) //si ha ido bien
        resolve(resultado)
    else //si ha ido mal
        reject("No hay resultados")
})

/**
 * Llamada a la 1ª Promesa
 */
/*
 promesaMayoresDeEdad1.then(resultado => {
    // Si entramos aquí, la promesa se ha procesado bien
    // En "resultado" podemos acceder al resultado obtenido
    console.log("Coincidencias encontradas:")
    console.log(resultado)
    }).catch(error => {
    // Si entramos aquí, ha habido un error al procesar la promesa
    // En "error" lo podemos consultar
    console.log("Error:", error)
    })
*/

/**
 * Segunda forma de definir Promesas
 */
let promesaMayoresDeEdad2 = (listado) => { //le pasas al método el array sobre el que quieres trabajar
    return new Promise((resolve, reject) => {
        let resultado = listado.filter(persona => persona.edad >= 18)
        if (resultado.length > 0)
            resolve(resultado)
        else
            reject("No hay resultados")
    })
}

/**
 * Llamada 2ª Promesa
 */
let p = promesaMayoresDeEdad2(datos).then(resultado => {
    // Si entramos aquí, la promesa se ha procesado bien
    // En "resultado" podemos acceder al resultado obtenido
    console.log("Coincidencias encontradas:")
    console.log(resultado)
}).catch(error => {
    // Si entramos aquí, ha habido un error al procesar la promesa
    // En "error" lo podemos consultar
    console.log("Error:", error)
})

//esperando a que acabe
/*Promise.all([p]).then(values => { //podríamos acabar a que acabaran más de
    console.log("Acabaron las promesas")
})*/

//otra manera de llamar promesas
let buscar = async () => {
    try {
        const resultado = await promesaMayoresDeEdad2(datos)
        console.log(resultado)
        console.log("Después")
    } catch (error) {
        console.log(error)
    }
}
buscar()
