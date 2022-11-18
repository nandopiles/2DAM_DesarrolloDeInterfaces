/*Crea una función que reciba 2 números por parámetro, el primer número indicará cuantas
veces debemos imprimir el segundo por pantalla, pero en cada iteración muéstra el valor
anterior multiplicado por 2. Ejemplo: Si recibimos 4 y 6 imprimiremos: 6 12 24 48. Llama a la
función varias veces.*/
let fun = (num1, num2) => {
  console.log(num2);
  for (let i = 0; i < num1; i++) {
    console.log((num2 *= 2));
  }
};

fun(2, 3);
console.log("");
fun(8, 2);
console.log("");
fun(7, 4);
