
function sumar1(num1, num2) {
  return num1 + num2;
}
let s = sumar1(2, 2);
console.log(s);

let sumar2 = function (num1, num2) {
  return num1 + num2;
};
console.log(sumar2(3, 2));

let sumar = (num1, num2) => {
  return num1 + num2;
};
console.log(sumar(4, 2));