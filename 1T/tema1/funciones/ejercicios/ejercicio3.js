/* Crea una función que reciba 2 parámetros. El primero será una cadena y el segundo otra
cadena que contendrá un caracter. Convierte ambos parámetros a cadena y comprueba que
efectivamente, el segundo parámetro tiene una longitud de 1. Debes mostrar cuantas veces
aparece el caracter recibido en la cadena. Ejemplo: Si recibimos "carcasa" y "a", debemos
indicar que aparece 3 veces dicha letra en la cadena. Llama a la función varias veces.*/

let fun = (text, char) => {
    let cont = 0;

    for (let i = 0; i < text.length; i++) {
        if(text[i] == char) {
            cont++;
        }
    }
    console.log(cont);
};

fun("mamada", "a");
