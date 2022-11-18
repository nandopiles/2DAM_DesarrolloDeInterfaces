const { dialog } = require('@electron/remote')
/**
 * vincular variables con elementos del html
 */
let palabra = document.getElementById("palabra")
let letra = document.getElementById("letra")
let resultado = document.getElementById("resultado")
let imagen = document.getElementById("imagen")
let reiniciar = document.getElementById("reiniciar")
let salir = document.getElementById("salir")
/**
 * mis variables internas del programa
 */
let guiones = new Array()
let palabraArray = null
let resulTexto = null
let contFallos = null
let letraAcertada = null
let palabraAcertada = null
let srcTexto = null
/**
 * constantes para mensajes de info
 */
const perdido = {
    type: 'info',
    title: 'Info',
    message: 'Has perdido :(\n(*)Haz clic en \'Reiniciar\' para volver a jugar'
}
const ganado = {
    type: 'info',
    title: 'Info',
    message: 'Has ganado :)!!!\n(*)Haz clic en \'Reiniciar\' para volver a jugar'
}

//_________________________________
letra.disabled = true

/**
 * pasar el contenido del array al campo 'Resultado' sin el estilo "array"
 */
let transformarTexto = (array) => {
    resulTexto = ""
    for (let i = 0; i < array.length; i++) {
        resulTexto += array[i]
    }
    resultado.innerHTML = resulTexto
}

/**
 * dibujar la cantidad de guiones que letras tiene la palabra
 */
let dibujarGuiones = () => {
    for (let i = 0; i < palabra.value.length; i++) {
        guiones.push("_ ")
    }
    
    transformarTexto(guiones)
}

/**
 * usuario introduce la palabra a adivinar
 */
palabra.addEventListener('keydown', (e) => {
    if (e.key == "Enter") {
        dibujarGuiones()
        palabraArray = palabra.value.split("")
        letra.disabled = false
        palabra.disabled = true
    }
})

/**
 * ver si la letra introducida está en la palabra a adivinar
 * si esa letra está, ésta será reemplazada por el guión
 * en la posición dónde corresponda
 */
let checkLetter = (letter) => {
    letraAcertada = false

    for (let i = 0; i < palabraArray.length; i++) {
        if (palabraArray[i] == letter) {
            guiones.splice(i, 1, letter + " ") //reemplazo el guión en la posición que está la letra
            letraAcertada = true
        }
    }
    transformarTexto(guiones)
    return letraAcertada
}

/**
 * comprobar si hay algún "_ " en el array
 * si hay alguno significa que quedan letras por adivinar
 * y el juego debe continuar
 */
let comprobarResult = () => {
    palabraAcertada = true
    guiones.forEach(e => {
        if(e == "_ "){
            palabraAcertada = false
        }
    });
        
    return palabraAcertada
}

/**
 * usuario 1 letra por teclado
 */
letra.addEventListener('keydown', (e) => {
    if (e.key == "Enter") {
        if (letra.value.length > 1) {
            dialog.showErrorBox("Atención", "Solo se puede introducir 1 letra!!!")
            letra.value = ""
        } else {
            letraAcertada = checkLetter(letra.value)
            if (letraAcertada == false) {
                contFallos++
                srcTexto = "./img/"+contFallos+".png"
                imagen.setAttribute("src", srcTexto)
                if(contFallos >= 6) {
                    letra.disabled = true //desactivo el campo para que el user se vea forzado a Reiniciar
                    dialog.showMessageBox(perdido)
                }
                letra.value = ""
            } else {
                palabraAcertada = comprobarResult()
                if (palabraAcertada == true) {
                    letra.disabled = true //le obligo a Reiniciar
                    dialog.showMessageBox(ganado)
                }
                letra.value = ""
            }
            
        }
    }
})

/**
 * se reinicia, limpia e inicializa todo de nuevo para dar de nuevo una nueva partida
 */
reiniciar.addEventListener('click', ()=>{
        //pongo todos los campos vacíos
        palabra.value = ""
        letra.value = ""
        //hago que el player 1 tenga que introducir una palabra
        palabra.disabled = false
        letra.disabled = true
        //reinicio los fallos
        contFallos = 0
        //vacío los arrays
        palabraArray = new Array()
        guiones = new Array()
        resultado.innerHTML = ""
        //cambio la img a la inicial
        srcTexto = "./img/0.png"
        imagen.setAttribute("src", srcTexto)
})

/**
 * cierra la aplicación
 */
salir.addEventListener('click', ()=>{
    onclick = window.close()
})