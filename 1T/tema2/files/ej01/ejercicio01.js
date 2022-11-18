//lectura del fichero y conversor a lector;
const fs = require("fs");

let fichero = fs.readFileSync("./libros.json"); //meto en una variable el fichero
let libros = new Array(); //creo un array para meter dentro de ella todos los datos del fichero
libros = JSON.parse(fichero); //transformo la info del fichero en "lenguaje legible"

//creamos una nueva variable con la info del JSON
let nuevo = {
  title: "AAAAAA",
  author: "AAAAA",
  price: "69",
  img: "AAAAAAA.jpg",
  eslibro: true,
};
let nuevo2 = {
  title: "MAMAMAMA",
  author: "MAMAMAMA",
  price: "69",
  img: "MAMAMAMA.jpg",
  eslibro: true,
};
libros.push(nuevo); //añadimos la nueva info a nuestro Array "libros"
libros.push(nuevo2);
libros = remove("AAAAAA");
modify("MAMAMAMA");

fs.writeFileSync("./libros.json", JSON.stringify(libros)); //guardamos la info de nuestro Array y traducimos a lenguaje "Objeto"

verLibrosComics();

//funciones
function verLibrosComics() {
  libros.forEach((item) => {
    if (item.eslibro === true)
      console.log(
        item.title +
          " escrito por " +
          item.author +
          "\nEs un Libro\n__________________"
      );
    else
      console.log(
        item.title +
          " escrito por " +
          item.author +
          "\nEs un Cómic\n__________________"
      );
  });
}

//función que elimina un elemento específico
function remove(title) {
  let newArray = libros.filter((item) => item.title !== title);
  return newArray;
}

//función para modificar un elemento del JSON
function modify(title) {
  let indice;
  let newArray = libros.findIndex((item, index) => {
    if (item.title === title) indice = index;
    else indice = -1;
  });
  if (indice != -1) libros[indice].title = "XXXXXX";
  else console.log("(-) Elemento no encontrado");
}
