/* Realiza los siguientes pasos (muestra por consola el resultado después de aplicar cada uno):
 - Crea un array con 4 elementos
 - Concatena 2 elementos más al final y 2 al principio
 - Elimina las posiciones de la 3 a la 5 (ambas incluidas)
 - Inserta 2 elementos más entre el penúltimo y el último
 - Muestra el array del paso anterior, pero con los elementos separados por " ==> "*/

let array = ["Mama", "Papa", "Pala", "JaJa"];
console.log(array);
array.push("Samba", "Sara");
array.unshift("1st", "2nd");
console.log(array);
array.splice(2, 1); //posición | cuántas posiciones quieres borras
array.splice(4, 1);
console.log(array);
array.splice(array.length -1, 0, "susu","sasa"); //añadir en la penúltima posición esas palabras
console.log(array);
console.log(array.join(" ==> "));