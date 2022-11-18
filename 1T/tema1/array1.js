//insertar los número de 0 a N
let vec = new Array();
const N = 100;

for (let i = 0; i <= N; i++) {
    vec.push(i);
}
console.log(vec.toString() + "\n\n");

//verlo separado de guioncitos
let cad = vec.join("-");
console.log(cad.toString());

//ordenar Arrays
let a = ["a", "b", "c", "d", "e", "f"];
a.reverse(); // Hace el reverse del array original
console.log(a); // Imprime ["f", "e", "d", "c", "b", "a"]

let x = ["Peter", "Anne", "Thomas", "Jen", "Rob", "Alison"];
x.sort(); // Ordena el array original
console.log(x); // Imprime ["Alison", "Anne", "Jen", "Peter", "Rob", "Thomas"]

//ordenar números por carácteres
let y = [20, 6, 100, 51, 28, 9];
y.sort(); // Ordena el array original
console.log(y); // Imprime [100, 20, 28, 51, 6, 9]

//ordenar números de menor a mayor
y.sort(function (n1, n2) {
    return n1 - n2;
});
console.log(y); // Imprime [6, 9, 20, 28, 51, 100]

//ordenar números de mayor a menor
y.sort(function (n1, n2) {
    return n1 - n2;
});
console.log(y); // Imprime [6, 9, 20, 28, 51, 100]

//For Each
let s = [3, 21, 15, 61, 9, 54];
let sum = 0;
s.forEach(function (num) { //
    sum += num;
});
console.log(sum); // Imprime 163

//te devuelve un array modificado como tú quieras
let b = [4, 21, 33, 12, 9, 54];
let c = b.map(function (num) {
    return num * 2;
});// Imprime [8, 42, 66, 24, 18, 108]
console.log(c.toString());