/*Crea un array de cadenas y ordénalo usando el método sort de mayor a menor longitud .
 Imprime el array original (antes de ordenarlo) y el resultado. */

let array = ["Maria", "Ana", "Miguel", "Patricia", "Andrea", "Mya"];
console.log(array);

for (let i = 0; i < array.length; ++i) {
    for (let j = i + 1; j < array.length; ++j) {
        if (array[i].length > array[j].length) {
            let auxiliar = array[i];
            array[i] = array[j];
            array[j] = auxiliar;
        }
    }
}
console.log(array);