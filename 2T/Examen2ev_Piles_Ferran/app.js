//MONGO
const { MongoClient } = require('mongodb')
//cadena de conexión
const url = 'mongodb+srv://admin:admin@nutgod.adcito8.mongodb.net'
//instanciar cliente de mongo
const client = new MongoClient(url)
//base de datos a usar
const dbName = 'examen2ev'

let alimentos
let books
let electrodomesticos
let listaColecciones

let basededatos = async () => {
    try {
        await client.connect()
        const db = client.db(dbName)

        listaColecciones = await db.listCollections().toArray()
        console.log(listaColecciones)

        const collectionAlimentos = db.collection('alimentos')
        alimentos = await collectionAlimentos.find({}).toArray()

        const collectionBooks = db.collection('books')
        books = await collectionBooks.find({}).toArray()

        const collectionElectrodomesticos = db.collection('electrodomesticos')
        electrodomesticos = await collectionElectrodomesticos.find({}).toArray()
    } finally {
        client.close();
    }
}

basededatos()
    .then(() => {
        let mostrarAlimentos = () => {
            let cad = ""
            alimentos.forEach((alimento, index) => {
                cad += `
            <tr>
                <td>${alimento.Alimento}</td>
                <td>${alimento.Calorias}</td>
                <td>${alimento.Grasas}</td>
                <td>${alimento.Proteina}</td>
                <td>${alimento.Carbohidratos}</td>
                <td>${alimento.img}</td>
                <td><button><span class="icon icon-logout" id="alimento${index}"></span></button></td>
            </tr>`
            });
            return cad
        }

        let mostrarTablaAlimentos = () => {
            let cad = `
                    
                <thead>
                    <tr>
                        <th>Alimento</th>
                        <th>Calorías</th>
                        <th>Grasas</th>
                        <th>Proteína</th>
                        <th>Carbohidratos</th>
                        <th>Img</th>
                    </tr>
                </thead>
                <tbody id="lista-productos">`
            cad += mostrarAlimentos()
            cad += `</tbody>
            `

            return cad
        }

        let mostrarBooks = () => {
            let cad = ""
            books.forEach((book, index) => {
                cad += `
            <tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.img}</td>
                <td><button><span class="icon icon-logout" id="book${index}"></span></button></td>
            </tr>`
            });

            return cad
        }

        let mostrarTablaBooks = () => {
            let cad = `
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Img</th>
                    </tr>
                </thead>
                <tbody id="lista-productos">`
            cad += mostrarBooks()
            cad += `</tbody>`

            return cad
        }

        let mostrarElectrodomesticos = () => {
            let cad = ""
            electrodomesticos.forEach((electrodomestico, index) => {
                cad += `
            <tr>
                <td>${electrodomestico.nombre}</td>
                <td>${electrodomestico.precioCoste}</td>
                <td>${electrodomestico.precioVenta}</td>
                <td>${electrodomestico.img}</td>
                <td><button><span class="icon icon-logout" id="electrodomestico${index}"></span></button></td>
            </tr>`
            });

            return cad
        }

        let mostrarTablaElectrodomesticos = () => {
            let cad = `
            <table table class="table-striped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio Coste</th>
                        <th>Precio Venta</th>
                        <th>Img</th>
                    </tr>
                </thead>
                <tbody id="lista-productos">`
            cad += mostrarElectrodomesticos()
            cad += `</tbody>`

            return cad
        }

        let crearSelects = () => {
            let cad = ""
            listaColecciones.forEach(element => {
                cad += `<option value="${element.name}">${element.name}</option>`
            });
            document.getElementById("select").innerHTML = cad;
        }

        crearSelects()
        //mostrar el primero
        document.getElementById("tabla").innerHTML = mostrarTablaElectrodomesticos()

        electrodomesticos.forEach((element, index) => {
            document.getElementById("electrodomestico" + index).addEventListener('click', () => {
                console.log(element.nombre)
                document.getElementById("foto-producto").innerHTML = `
                        <img class="photos" src="images/${element.img}" alt="alimento${element.nombre}">`
            })
        });
        //mostrar la opción seleccionada
        let select = document.getElementById("select")
        select.addEventListener("change", () => {
            let selected = select.value
            if (selected == "alimentos") {
                document.getElementById("tabla").innerHTML = mostrarTablaAlimentos()

                alimentos.forEach((element, index) => {
                    document.getElementById("alimento" + index).addEventListener('click', () => {
                        console.log(element.Alimento)
                        document.getElementById("foto-producto").innerHTML = `
                        <img class="photos" src="images/${element.img}" alt="alimento${element.Alimento}">`
                    })
                });
            } else if (selected == "books") {
                document.getElementById("tabla").innerHTML = mostrarTablaBooks()

                books.forEach((element, index) => {
                    document.getElementById("book" + index).addEventListener('click', () => {
                        console.log(element.title)
                        document.getElementById("foto-producto").innerHTML = `
                        <img class="photos" src="images/${element.img}" alt="book${element.title}">`
                    })
                });
            } else if (selected == "electrodomesticos") {
                document.getElementById("tabla").innerHTML = mostrarTablaElectrodomesticos()

                electrodomesticos.forEach((element, index) => {
                    document.getElementById("electrodomestico" + index).addEventListener('click', () => {
                        console.log(element.nombre)
                        document.getElementById("foto-producto").innerHTML = `
                        <img class="photos" src="images/${element.img}" alt="alimento${element.nombre}">`
                    })
                });
            }
        })
    })
    .catch(() => console.log("[-] Something wrong..."))