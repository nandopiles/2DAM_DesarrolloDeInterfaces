const electrodomesticos = require("./electrodomesticos.json") //convertir a array
let desplegable = document.getElementById("desplegable")
let info = document.getElementById("informacion")
let totales = document.getElementById("totales")
//generar el select:
let cad = ``

electrodomesticos.forEach((e, i) => {
    cad += `<ion-select-option value="${i}">
                ${e.nombre}
            </ion-select-option>`
})

desplegable.innerHTML = cad

let mostrar = (i)=>{
    let cad = `
        <ion-row>
            <ion-column>Descripción:</ion-column>
            <ion-column>${electrodomesticos[i].nombre}</ion-column>
        </ion-row>
        <ion-row>
            <ion-column>Precio coste:</ion-column>
            <ion-column>${electrodomesticos[i].precioCoste}</ion-column>
        </ion-row>
        <ion-row>
            <ion-column>Precio venta:</ion-column>
            <ion-column>${electrodomesticos[i].precioVenta}</ion-column>
        </ion-row>
        <ion-row>
            <ion-column>Stock actual:</ion-column>
            <ion-column>${electrodomesticos[i].stockActual}</ion-column>
        </ion-row>
        <ion-row>
            <ion-column>Stock min:</ion-column>
            <ion-column>${electrodomesticos[i].stockMin}</ion-column>
        </ion-row>`
    return cad
}
info.innerHTML = mostrar(0) //muestra la primera posición
let select = document.getElementById("desplegable")
select.addEventListener("ionChange", ()=>{
    let i = select.value
    
    info.innerHTML = mostrar(i)
})

//calcular suma de los articulos en Stock Actual
let suma = 0
electrodomesticos.forEach(e=>{
    suma += e.stockActual
})
//crear un Array con los elementos que cumplen con la condición
let minimo = electrodomesticos.filter(e =>{
    return e.stockActual < e.stockMin
})
//lista desordenada (con puntito) <li></li>
cad = `
<ul>
    <li>Total Productos: ${electrodomesticos.length}</li>
    <li>Total Stock Actual: ${suma}</li>
    <li>Productos con Stock por debajo del mínimo:
        <ol>`
            minimo.forEach(e=>{
                cad += `<li>${e.nombre}</li>`
            })
    cad += `</ol>
    </li> 
</ul>`
totales.innerHTML = cad