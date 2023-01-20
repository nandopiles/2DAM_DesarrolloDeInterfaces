
const fs = require('fs');
const pdf = require('html-pdf');
const { dialog } = require('@electron/remote')

//variables lectura de fichero


//variables botones para escuchador
let btnAceptar = document.getElementById("aceptar");


//generar el DOM para el ingredientes:
let fichero = fs.readFileSync('./file/ingredientes.json');
let ingredientes = JSON.parse(fichero).ingredientes;


//crear check de ingredientes en div id="ingredientes" siguiendo la estructura:
/*
	<div class="checkbox">
    	<label>
     		 <input type="checkbox" id="ingrediente + i" value="ingredientes[i]"> ingredientes[i]
   		 </label>
  	</div>
*/
let cad = "";
for (let i = 0; i < ingredientes.length; i++) {
	cad += '<div class="checkbox"><label><input type="checkbox" id="ingrediente'
	 +i + '" value="' + ingredientes[i] + '">' + ingredientes[i] +
		'</label></div>';
}
document.getElementById("ingredientes").innerHTML = cad;
//EVENTOS
btnAceptar.addEventListener('click', () => {
	//recuperar elementos fijos
	let nombre = document.getElementById("nombre").value;
	let telefono = document.getElementById("telefono").value;
	let direccion = document.getElementById("direccion").value;

	let tamaño = "";
	if (document.getElementById("tamaño1").checked)
		tamaño = document.getElementById("tamaño1").value;
	if (document.getElementById("tamaño2").checked)
		tamaño = document.getElementById("tamaño2").value;
	if (document.getElementById("tamaño3").checked)
		tamaño = document.getElementById("tamaño3").value;

	let masa = "";
	if (document.getElementById("masa1").checked)
		masa = document.getElementById("masa1").value;
	if (document.getElementById("masa2").checked)
		masa = document.getElementById("masa2").value;
		
	//recuperar ingredientes
	let seleccionados = new Array();
	for (let i = 0; i < ingredientes.length; i++) {
		if (document.getElementById("ingrediente" + i).checked)
			seleccionados.push(ingredientes[i]);
	}
	
	//crear pdf
	let content = '<h1>Pedido</h1>' +
		'<h1>Nombre:' + nombre + '<h1>' +
		'<h1>Teléfono:' + telefono + '<h1>' +
		'<h1>Dirección:' + direccion + '<h1>' +
		'<h1>Tamaño:' + tamaño + '<h1>' +
		'<h1>Masa:' + masa + '<h1>' +
		'<h1> Lista de ingredientes: <h1>';
	for (let i = 0; i < seleccionados.length; i++) {
		content += '<h1>' + seleccionados[i] + '<h1>';
	}
	pdf.create(content).toFile('./pdfpedidos/' + nombre + '.pdf', function (err, res) {
		if (err) {
			console.log(err);
		} else {
           dialog.showErrorBox("Atención","Pedido guardado")
			console.log(res);
		}
	});
});

