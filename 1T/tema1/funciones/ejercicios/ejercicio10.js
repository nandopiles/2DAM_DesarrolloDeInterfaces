/* Crea una función calcule el área de un triángulo. Esta función recibirá 3 parámetros:
 2 lados del triángulo, y el ańgulo entre ellos (en grados).
 Para calcular el área con estos datos debemos aplicar la fórmula:
(1/2)*lado1*lado2*seno(ángulo).
 Debes tener en cuenta que para aplicar la fórmula, el ángulo debe estar en radianes. Para
pasarlo a radianes lo multiplicamos por PI y dividimos entre 180. */

let lado1 = 32, lado2 = 13, anguloGrados = 60;

let anguloRadianes = conversorRadianes(anguloGrados);
let area = calcularArea(lado1, lado2, anguloRadianes);
console.log("El área es de --> " + area + "m^2");


function conversorRadianes(angulo) {
    return angulo * Math.PI / 180;
};

function calcularArea(lado1, lado2, angulo) {
    return ((1/2)*lado1*lado2*Math.sin(angulo)).toFixed(2); //capar para que solo salgan 2 decimales
};