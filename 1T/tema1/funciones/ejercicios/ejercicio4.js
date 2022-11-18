/*Crea una función que reciba 3 parámetros (nombre de producto, precio e impuesto en
porcentaje sobre 100). Dicha función hará lo siguiente:
 - Los parámetros deberán tener un valor por defecto por si no los recibe que deben ser:
"Producto genérico", 100 y 21.
 - Convierte el nombre de producto a string (por si acaso) y los otros 2 a número. Si el precio o
el impuesto no son numéros válidos (NaN) muestra un error. Si son válidos, muestra por
consola el nombre del producto y el precio final contando impuestos.
 - Llama a la función varias veces, omitiendo parámetros, con todos los parámetros, y pasándo
algún valor no númerico en el precio o impuesto.*/

let fun = (product = "Producto Genérico", precio = 100, impuestos = 21) => {
  product = String(product);
  precio = Number(precio);
  impuestos = Number(impuestos);

  console.log("Producto: "+product+"\nPrecio: "+precio+"\nImpuestos: "+impuestos+"\n");
};

fun();
fun("caca", 23, 3);
fun(2, "a", 3);