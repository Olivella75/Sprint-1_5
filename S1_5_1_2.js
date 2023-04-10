// Crea una altra funció que mostri per consola el contingut del fitxer de l'exercici anterior.

const fs = require("fs");

function see () { //Síncrona sense paràmetre
    let file1 = fs.readFileSync ("./fitxer_nou.txt", "utf-8");
    console.log(file1);
}
see();

function see2 (param) { //Síncrona amb paràmetre
    let file1 = fs.readFileSync ("./" + param, "utf-8");
    console.log(file1);
}
see2("fitxer_nou.txt");

function see3 () { //Asíncrona
    let file1 = fs.readFile("./fitxer_nou.txt", "utf-8", (err, file1) => {
        if(err) {
            throw err;
        }
        console.log(file1);
    });
}
see3();