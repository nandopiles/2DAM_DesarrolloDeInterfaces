/*Crea un array de números de más de una cifra. Mapea ese array en otro que sea la suma de
las cifras de cada número. No puedes usar bucles.
 Pista: Puedes convertir los números a cadena primero y después con Array.from(cadena) la
transformas a array de caracteres (que puedes sumar)
 Imprime el array original y el resultado (ej: [123, 34, 52] -> [6, 7, 7]) */

let array = [13, 69, 23, 10, 11, 21];
console.log(array);

let a = array.map((num) => num += ''); //convertir un entero en String. (El método Map devuelve un Array, no sobreescribe)
//console.log(typeof(a[0]));             comprobar si los elementos del nuevo array son Strings


