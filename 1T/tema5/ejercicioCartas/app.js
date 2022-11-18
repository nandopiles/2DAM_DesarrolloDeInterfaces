/**
 * Enlaces
 */
const credito = document.getElementById("credito")
const apuesta = document.getElementById("apuesta")
const btnApostar = document.getElementById("btn-apostar")
const btnReset = document.getElementById("btn-reset")
const palos = document.getElementById("palos")
const notif = document.getElementById('notification');

/**
 * Cartas
 */
const carta1 = document.getElementById("carta1")
const carta2 = document.getElementById("carta2")
const carta3 = document.getElementById("carta3")
const carta4 = document.getElementById("carta4")
const carta5 = document.getElementById("carta5")
const carta6 = document.getElementById("carta6")

/**
 * Variables
 */
const creditoInicial = 1000
let nuevoCredito = creditoInicial
const arrayPalos = [
    "bastos",
    "oros",
    "espadas",
    "copas"
]
let contBastos = 0, contEspadas = 0, contCopas = 0, contOros = 0
let ganador = false


/**
 * Cambiar el crédito
 */
let cambioCredito = () => {
    if (ganador) {
        nuevoCredito = parseInt(nuevoCredito) + parseInt(apuesta.value) //hay que parsearlo, si no se concatena
    } else {
        nuevoCredito = parseInt(nuevoCredito) - parseInt(apuesta.value)
    }

    if (nuevoCredito >= creditoInicial) {
        credito.innerHTML = "Credito: <b><span style=color:green>" + nuevoCredito + "</span></b>"
    } else {
        credito.innerHTML = "Credito: <b><span style=color:red>" + nuevoCredito + "</span></b>"
    }
}

/**
 * Método random
 * @returns num random del 0 a la longitud del array
 */
let random = () => {
    return Math.floor(Math.random() * arrayPalos.length);
}

/**
 * Cantidad de cartas del mismo palo que han salido en la partida
 * @param {*} paloElegido 
 */
let contadorCartas = (paloElegido) => {
    switch (paloElegido) {
        case "bastos":
            contBastos++
            break;

        case "espadas":
            contEspadas++
            break;
        case "copas":
            contCopas++
            break;

        case "oros":
            contOros++
            break;
    }
}

/**
 * Suma las cartas del mismo palo para saber si hay un ganador
 */
let comprobarResultado = () => {
    switch (palos.value) {
        case "Bastos":
            if (contBastos >= 2) {
                console.log("bastos")
                notif.innerText = "Has obtenido " + contBastos + " aciertos! ✅Enhorabuiena, has ganado la apuesta✅"
                notif.opened = true
                ganador = true
            }
            break;

        case "Espadas":
            if (contEspadas >= 2) {
                console.log("espadas")
                notif.innerText = "Has obtenido " + contEspadas + " aciertos! ✅Enhorabuiena, has ganado la apuesta✅"
                notif.opened = true
                ganador = true
            }
            break;
        case "Copas":
            if (contCopas >= 2) {
                console.log("copas")
                notif.innerText = "Has obtenido " + contCopas + " aciertos! ✅Enhorabuiena, has ganado la apuesta✅"
                notif.opened = true
                ganador = true
            }
            break;

        case "Oros":
            if (contOros >= 2) {
                console.log("oros")
                notif.innerText = "Has obtenido " + contOros + " aciertos! ✅Enhorabuiena, has ganado la apuesta✅"
                notif.opened = true
                ganador = true
            }
            break;
    }
    if (!ganador) {
        notif.innerText = "❌Has perdido❌"
        notif.opened = true
    }
}

/**
 * comprueba si todas las cartas están dadas la vuelta y comprobar el resultado
 * @param {*} c1 
 * @param {*} c2 
 * @param {*} c3 
 * @param {*} c4 
 * @param {*} c5 
 * @param {*} c6 
 */
let empezarComprabacion = (c1, c2, c3, c4, c5, c6) => {
    if (c1 != 0 && c2 != 0 && c3 != 0 && c4 != 0 && c5 != 0 && c6 != 0) {
        comprobarResultado()
        cambioCredito()
    }
}

/**
 * Dar la vuelta a las cartas de una manera random
 */
let volteoCartas = () => {
    let c1 = 0, c2 = 0, c3 = 0, c4 = 0, c5 = 0, c6 = 0

    carta1.addEventListener('click', () => {
        if (c1 < 1) {
            let paloElegido = arrayPalos[random()]
            carta1.setAttribute("src", "./images/" + paloElegido + ".png")
            contadorCartas(paloElegido)
            c1++
            empezarComprabacion(c1, c2, c3, c4, c5, c6)
        }
    })
    carta2.addEventListener('click', () => {
        if (c2 < 1) {
            let paloElegido = arrayPalos[random()]
            carta2.setAttribute("src", "./images/" + paloElegido + ".png")
            contadorCartas(paloElegido)
            c2++
            empezarComprabacion(c1, c2, c3, c4, c5, c6)
        }
    })
    carta3.addEventListener('click', () => {
        if (c3 < 1) {
            let paloElegido = arrayPalos[random()]
            carta3.setAttribute("src", "./images/" + paloElegido + ".png")
            contadorCartas(paloElegido)
            c3++
            empezarComprabacion(c1, c2, c3, c4, c5, c6)
        }
    })
    carta4.addEventListener('click', () => {
        if (c4 < 1) {
            let paloElegido = arrayPalos[random()]
            carta4.setAttribute("src", "./images/" + paloElegido + ".png")
            contadorCartas(paloElegido)
            c4++
            empezarComprabacion(c1, c2, c3, c4, c5, c6)
        }
    })
    carta5.addEventListener('click', () => {
        if (c5 < 1) {
            let paloElegido = arrayPalos[random()]
            carta5.setAttribute("src", "./images/" + paloElegido + ".png")
            contadorCartas(paloElegido)
            c5++
            empezarComprabacion(c1, c2, c3, c4, c5, c6)
        }
    })
    carta6.addEventListener('click', () => {
        if (c6 < 1) {
            let paloElegido = arrayPalos[random()]
            carta6.setAttribute("src", "./images/" + paloElegido + ".png")
            contadorCartas(paloElegido)
            c6++
            empezarComprabacion(c1, c2, c3, c4, c5, c6)
        }
    })
}

/**
 * Comprueba que tienes créditos suficientes y te pone a jugar
 */
btnApostar.addEventListener('click', () => {
    if (apuesta.value == "") {
        notif.innerText = "❌Apuesta inválida!!!❌"
        notif.opened = true
    } else {
        if (apuesta.value > nuevoCredito) {
            notif.innerText = "❌No tienes Créditos suficientes!!!❌"
            notif.opened = true
            apuesta.value = ""
            if (nuevoCredito == 0) {
                notif.innerText = "❌Deja de jugar, te has quedado a 0 y tus hijos ya no pueden comer❌"
                notif.opened = true
                apuesta.disabled = true
                palos.disabled = true
                btnApostar.disabled = true
                btnReset.disabled = true
            }
        } else {
            apuesta.disabled = true
            palos.disabled = true
            btnApostar.disabled = true
            btnApostar.setAttribute("class", "btn btn-large btn-negative")
            volteoCartas()
        }
    }
})

/**
 * Pone el dorso de las cartas otra vez para iniciar una nueva partida
 */
let resetearCartas = () => {
    carta1.setAttribute("src", "./images/dorso.png")
    carta2.setAttribute("src", "./images/dorso.png")
    carta3.setAttribute("src", "./images/dorso.png")
    carta4.setAttribute("src", "./images/dorso.png")
    carta5.setAttribute("src", "./images/dorso.png")
    carta6.setAttribute("src", "./images/dorso.png")
}

/**
 * Resetea la partida y limpia toda información
 */
btnReset.addEventListener('click', () => {
    apuesta.value = ""
    palos.value = "Bastos"
    contBastos = 0, contCopas = 0, contEspadas = 0, contOros = 0
    resetearCartas()
    apuesta.disabled = false
    palos.disabled = false
    btnApostar.disabled = false
    btnApostar.setAttribute("class", "btn btn-large btn-positive")
    ganador = false
})

credito.innerHTML = "Credito: <b>" + creditoInicial + "</b>"