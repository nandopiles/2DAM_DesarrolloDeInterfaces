let b = document.getElementById("b");
let d = document.getElementById("d");
let inp = document.getElementById("inp");

//innerHTML para todo tipo de etiquetas menos las "input"
//value sólo para etiquetas input
b.addEventListener("click", () => {
  d.innerHTML = ""; //limpiar el contenido del DIV

  let N = inp.value; //dimensión
  let m = new Array(N);
  

  //definir una matriz bidimensional
  for (let i = 0; i < N; i++) {
    m[i] = new Array(N);
    for (let j = 0; j < N; j++) {
      m[i][j] = 0;
    }
  }
  //calcular valores del triángulo de pascal
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (j == 0) m[i][j] = 1;
      else if (i > 0) {
        m[i][j] = m[i - 1][j] + m[i - 1][j - 1];
      }
    }
  }
  //reresentar una matriz bidimensional
  let linea =
    '<table class="table-striped"><thead><tr>' +
    "<th>Name</th><th>Author</th></tr></thead><tbody>";
  for (let i = 0; i < N; i++) {
    linea = " ";
    for (let x = 0; x < N - i; x++) {
      linea += " ";
    }
    for (let j = 0; j < N; j++) {
      if (m[i][j] == 0) m[i][j] = " "; //quitar los ceros
      linea += m[i][j] + " ";
    }
    linea += "</tbody></table>";
    d.innerHTML += "<pre>"+linea+"</pre>";
  }
});