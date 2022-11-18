let c = document.getElementById("c");
let d = document.getElementById("d");
let b = document.getElementById("b");
let b2 = document.getElementById("b2");
let b3 = document.getElementById("b3");
let t = document.getElementById("t");

let cont = 0;
let nombres = ["nombre1", "nombre2", "nombre3", "nombre4", "nombre5"];
let libros = require("./data/libros.json"); //sólo lectura

c.innerHTML = "Adios Nevado"; //contenido de la etiqueta HTML

//innerHTML para todo tipo de etiquetas menos las "input"
//value sólo para etiquetas input
b.addEventListener("click", () => {
  d.innerHTML = ""; //limpiar el contenido del DIV
  /*cont++;
    d.innerHTML = "has hecho "+cont+ " clicks mi rey<br>"
    t.value = cont*/

  /*usuario ponga un valor y al apretar el botón salga toda la cadena*/
  let n = Number(t.value);
  for (let i = 1; i <= n; i++) {
    d.innerHTML += "has hecho " + i + " clicks mi rey<br>";
  }
});

//al apretar ENTER...
t.addEventListener("keyup", (evento) => {
  if (evento.key == "Enter") {
    alert("Enter!"); //crea una ventana de ALERTA
  }
});

b2.addEventListener("click", () => {
  d.innerHTML = ""; //limpia el contenido del DIV
  nombres.forEach((nombre) => {
    d.innerHTML += nombre + "<br>";
  });
});

b3.addEventListener("click",()=>{
    d.innerHTML = '<table class="table-striped"><thead><tr>'+
    '<th>Name</th></tr></thead><tbody>';

    libros.forEach((e) => {
      d.innerHTML += '<tr><td>'+e.title + '</td></tr><br>';
    });
    d.innerHTML += '</tbody></table>'
})
