// Crea una funció que, en executar-la, escrigui una frase en un fitxer.

const fs = require ("fs");
//const { appendFile } = require("fs/promises");

function write() {
    return new Promise((resolve, reject) => {
        fs.writeFile("fitxer_nou.txt", "Frase escrita des de Node", (err) => { //appendFile
            if(err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}
write()
    .then(() => console.log("Escriptura realitzada correctament."))
    .catch((err) => console.log("S'ha produït el següent error: ", err)); 
