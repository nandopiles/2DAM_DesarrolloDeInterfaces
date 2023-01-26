//MONGO
const { MongoClient } = require('mongodb')
//cadena de conexión
const url = 'mongodb+srv://admin:admin@nutgod.adcito8.mongodb.net'
//instanciar cliente de mongo
const client = new MongoClient(url)
//base de datos a usar
const dbName = 'EjercicioLibros'

let btnBuy = document.getElementById("btnBuy")

let collection
let libros

async function run() {
    try {
        await client.connect()
        const db = client.db(dbName)
        collection = db.collection('libros')

        //recupero datos de libros
        libros = await collection.find({}).toArray()
    } finally {
        client.close();
    }
}

let listBooksBought = new Array()

let showImagesCover = () => {
    let images = ""

    libros.forEach((element, index) => {
        images += `
                <div class="col-lg-3 col-md-4 col-6 coverGeneral border" id="book${index}">
                    <img class="img-fluid rounded mx-auto d-block img-thumbnail coverPhoto" src="images/${element.img}" alt="image${index}">
                    <b>${element.title}</b>
                    <p>${element.author}</p>
                </div>`
    })
    console.log("[*] " + libros.length + " books found in the DB")

    btnBuy.innerHTML = listBooksBought.length
    document.getElementById("gallery").innerHTML = images
}

let makeButtonsShoppingListeners = () => {
    listBooksBought.forEach((element, index) => {
        document.getElementById("button" + index).addEventListener('click', () => {
            listBooksBought.splice(index, 1)
            console.log("[+] Book \"" + element.title + "\" removed")
            addToBag()
            btnBuy.innerHTML = listBooksBought.length
        })
    })
}

let addToBag = () => {
    let listOfBooksData = ""

    listBooksBought.forEach((element, index) => {
        listOfBooksData += `
                        <div class="row w-100">
                            <div class="col-12 col-sm-6 col-md-3 px-0">
                                <img
                                    src="images/${element.img}"
                                    alt="${element.title}"
                                    class="rounded-circle mx-auto d-block img-fluid"
                                />
                            </div>
                            <div class="col-12 col-sm-6 col-md-9 text-sm-left">
                                <br/>
                                <label class="name lead">${element.title}</label>
                                <br/>
                                <br/>
                                <label class="text">${element.author}</label>
                                <br/>

                                <button type="button" class="btn btn-outline-danger float-end" id="button${index}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-x" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M6.146 8.146a.5.5 0 0 1 .708 0L8 9.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 10l1.147 1.146a.5.5 0 0 1-.708.708L8 10.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 10 6.146 8.854a.5.5 0 0 1 0-.708z"></path>
                                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"></path>
                                </svg>
                              </button>
                            </div>
                        </div>
                        <hr>`
    });
    document.getElementById("sidebarBody").innerHTML = listOfBooksData
    makeButtonsShoppingListeners()
}

let makeImagesListeners = () => {
    libros.forEach((element, index) => {
        document.getElementById("book" + index).addEventListener('click', () => {
            listBooksBought.push(element)
            addToBag()
            btnBuy.innerHTML = listBooksBought.length
            console.log("[+] Book \"" + element.title + "\" added to bag")
        })
    })
}

run()
    .then(() => {
        showImagesCover()
        makeImagesListeners()
        makeButtonsShoppingListeners()
    })
