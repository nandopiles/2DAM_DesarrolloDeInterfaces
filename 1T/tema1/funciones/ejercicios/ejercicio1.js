/* Crea una función que reciba 2 cadenas por parámetro. Dicha función imprimirá por consola
qué cadena tiene mayor longitud. Si el tipo de algún parámetro no es string (typeof param !== "string"),
debes imprimir un error.
Llama a la función 3 veces con diferentes parámetros. En una de esas llamadas pásale por
parámetro un valor que no sea string.*/

let fun = (text1, text2) => {
  if (typeof text1 !== "string" || typeof text2 !== "string") {
    console.log("(-) Valor no admitido");
  } else if (text1.length > text2.length) {
    console.log('(+) "' + text1 + '" tiene mayor longitud');
  } else if (text1.length < text2.length) {
    console.log('(+) "' + text2 + '" tiene mayor longitud');
  } else {
    console.log("(+) Empate");
  }
};

fun("hola", "tonto");
fun(1, "tonto");
fun("papa", "caca");
fun("ladrillo", "marta");
