const N = 20;
let s = "";

for (let i = 0; i < N ; i++) {
    s = "* ";
    for (let j = 0; j < (N-i); j++) {
        s += "* ";   
    }
    console.log(s);
}