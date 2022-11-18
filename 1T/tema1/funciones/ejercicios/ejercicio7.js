/*Crea una función que reciba como primer parámetro el nombre de un alumno, seguido
 de un número indeterminado de notas (usa spread para agruparlas en un array).
 Utiliza el método reduce para sumar las notas y calcula la media, que deberás mostrar por
consola.
 Posible llamada -> printMedia("Pepe", 4.25, 6, 8.5, 9) */

 let printMedia = (name, ...notes) => { //num indeterminado de notes.
   let sum = notes.reduce((suma, item) => { //.reduce(*un acumulador*, *el item que va a iterar del array*)
      return suma += item; //queremos que se vaya acumulando la suma en "suma", de los valores del "item" que se esté iterando
   });
    console.log("La media de " + name + " es --> "+ (sum/notes.length).toFixed(2)); //.toFixed() limita el número de decimales
 };

 printMedia("Peper", 6, 4, 10, 0);
 printMedia("Maria", 6);
 printMedia("Juan", 2, 4, 6.23, 9, 1, 8, 7);