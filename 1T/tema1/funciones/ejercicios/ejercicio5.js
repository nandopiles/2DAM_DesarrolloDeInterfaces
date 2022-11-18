/*Crea una función de tipo flecha (arrow function) que reciba 2 parámetros. Una cadena
completa y un trozo de cadena a buscar. La función debe comprobar si el trozo de cadena de
búsqueda se encuentra dentro de la cadena completa e imprimir por consola un mensaje
indicando si ha encontrado coincidencia o no. La búsqueda no debe ser sensible a mayúsculas
o minúsculas, por lo que debes comparar ambas cadenas previa transformación a minúsculas
(o a mayúsculas). Ej: La cadena "Santiago de Compostela" contiene la cadena de búsqueda
"COMPO". Llama a la función varias veces. */

let fun = (text, part) => {
  let mayusText = text.toUpperCase();
  let mayusPart = part.toUpperCase();

  if (mayusText.includes(mayusPart)) {
    console.log("(+) La subcadena está en la cadena");
  } else {
    console.log("(-) Cadena no encontrada");
  }
};

fun("ala verga Santa", "santa");
fun("asabien que", "lala");