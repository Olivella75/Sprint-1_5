//Crea una funció que llisti per la consola el contingut del directori d'usuari/ària de l'ordinador utilizant Node Child Processes.

const { exec } = require("child_process");

function listarDirectorio() {
    exec("dir", (err, stdout, stderr) => {
        if(err) {
            console.log(`Error 1: ${err.message}`);
            return;
        } else if(stderr) {
            console.log("Error: ", stderr);
        } else {
            console.log(`Contenido: ${stdout}`);
        }
    });
}
listarDirectorio();