let b1 = document.getElementById("b1");
let b2 = document.getElementById("b2");
let n1 = document.getElementById("n1");
let n2 = document.getElementById("n2");

b1.addEventListener("click", () => {
  if (n2.value == "") {
    let num = Number(n1.value);
    n2.value = (num + 273.15).toFixed(2); //redondear
  } else if (n1.value == "") {
    let num = Number(n2.value);
    n1.value = (num - 273.15).toFixed(2);
  }
});

b2.addEventListener("click", () => {
  n1.value = "";
  n2.value = "";
});
