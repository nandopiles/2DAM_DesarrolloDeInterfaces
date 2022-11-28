const { dialog } = require('@electron/remote')
let movies = require("./data/movies.json");
let colors = require("./data/colors.json");

let directionRigth = true;
let position = 0;
let showMovie = (i) => {
  //primer div titulos:
  title.innerHTML = movies[i].title;
  time.innerHTML = "&nbsp;&nbsp;&nbsp;" + movies[i].date + "-" + movies[i].hours + "h:" + movies[i].minutes + "m";
  rating.innerHTML = "rating &nbsp;" + movies[i].rating + "/11";

  //segundo div imagen:
  cover.src = `./img/${i}.jpg`;

  //tercer div generos, descripción y botón:
  let dom = "";
  movies[i].genres.forEach(g => {
    //busco el color del género
    let color = colors.filter((c) => {
      return c.genre == g; // Si devuelve true, el elemento se queda en el array devuelto
    });
    dom += `<span class="icon icon-record" style="color:${color[0].color}">${g}</span>&nbsp;&nbsp;&nbsp;`;
  });

  genre.innerHTML = dom;
  description.innerHTML = movies[i].description;
  //creo el botón
  boton.innerHTML = '<button id="visit" class="btn btn-large btn-warning" style="margin-left: 40%;">Visit Movie</button>';
  //asigno un listener al botón creado:
  visit.addEventListener('click', () => {
    window.open(movies[i].website);
  });
}

//mostrar primera peli:
showMovie(0);
//evento de la imagen:
cover.addEventListener('click', () => {
  //controlar dirección de visialización de peliculas y
  //la posición donde nos encontramos
  if (directionRigth) {
    if (position == movies.length - 1) {
      const options = {
        type: 'info',
        title: 'Info',
        message: 'backward direction',
      };
      dialog.showMessageBox(options);
      directionRigth = false;
      position--;
    } else {
      position++;
    }
  } else {
    if (position == 0) {
      const options = {
        type: 'info',
        title: 'Info',
        message: 'forward direction',
      };
      dialog.showMessageBox(options);
      directionRigth = true;
      position++;
    } else {
      position--;
    }
  }
  showMovie(position);
});