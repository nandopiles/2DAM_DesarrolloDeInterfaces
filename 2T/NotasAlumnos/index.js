const { dialog } = require('@electron/remote')
const fs = require('fs')
//npm i @electron/remote

let datosAlumnos

let getFile = () => {
    let fileName = dialog.showOpenDialogSync({
        title: "Abriendo Datos JSON",
        defaultPath: "E:\\DAM_7J\\DAM_DesarrolloDeInterfaces\\2T\\NotasAlumnos\\files\\", //path dónde se abrira el Explorador de Archivos
        filters: [
            { name: 'Custom File Type', extensions: ['json'] }
        ]
    });
    return fileName
}

let studentsTable = ""

let printStudentToTable = (student, index) => {
    studentsTable += `
                    <tr>
                        <td>${student.grupo}</td>
                        <td>${student.nombre}</td>
                        <td contenteditable="true" id="mark-student${index}">${student.nota}</td>
                    </tr>`
    return studentsTable
}

let file = null

document.getElementById("open-explorer").addEventListener('click', () => {
    file = getFile()
    console.log(file[0])
    datosAlumnos = require(file[0]) //convierte a Array

    studentsTable = ""
    datosAlumnos.forEach((student, index) => {
        studentsTable = printStudentToTable(student, index)
    });
    document.getElementById("lista-alumnos").innerHTML = studentsTable
})

let fileSave

document.getElementById("save-marks").addEventListener('click', () => {
    if (file != null) {
        datosAlumnos.forEach((student, index) => {
            student.nota = document.getElementById("mark-student" + index).innerHTML
            console.log(student.nota)
        });
        fileSave = dialog.showSaveDialogSync({
            title: "Abriendo Datos JSON",
            defaultPath: "E:\\DAM_7J\\DAM_DesarrolloDeInterfaces\\2T\\NotasAlumnos\\files\\", //path dónde se abrira el Explorador de Archivos
            filters: [
                { name: 'Custom File Type', extensions: ['json'] }
            ]
        })
        fs.writeFileSync(fileSave, JSON.stringify(datosAlumnos))
        console.log("[+] Marks Updated")
    } else {
        console.log("[-] U have to open a file")
    }
})