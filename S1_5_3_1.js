//Crea una funció que creï dos fitxers codificats en hexadecimal i en base64 respectivament, a partir del fitxer del nivell 1.
//Inclou un README amb instruccions per a l'execució de cada part.

const fs = require('fs');

function write(param1, param2) {
    fs.writeFile(param1, param2, (err) => { 
        if(err) {
            console.log(err);
        } else {
            console.log(`Fitxer "${param1}" creat correctament.`);
        }
    });
}

function base64(param) {
    let bc= new Buffer.from (param);
    let bec = bc.toString("base64");
    write("fitxer_nou.b64", bec);
}

function hex(param) {
    let bc = new Buffer.from (param);
    let bec = bc.toString("hex");
    write("fitxer_nou.hex", bec);
}

function read(param) {
    fs.readFile(param, 'utf-8', (err, data) => {
        if(err) {
            console.log('Error: ', err);
        } else {
            base64(data);
            hex(data);
        }
    });
}
read("./fitxer_nou.txt");

//Crea una funció que guardi els fitxers del punt anterior, ara encriptats amb l'algoritme aes-192-cbc, i esborri els fitxers inicials.

const crypto = require('crypto');

function encrypt(param1, param2, fn) {
    const algorithm = 'aes-192-cbc';
    const password = 'contrasenya-secreta';
    const key = crypto.scryptSync(password, 'salt', 24);
    const iv = Buffer.alloc(16, 0);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const input = fs.createReadStream(param1);
    const output = fs.createWriteStream(param2);
    console.log(`Fitxer "${param2}" encriptat correctament.`);
    input.pipe(cipher).pipe(output);
    fileDelete(param1);
}

function fileDelete(param1) {
    setTimeout(() => { //Si no poses un timeout no es veu la creació i eliminació d'arxius. Va massa ràpid.
        try {
            fs.unlinkSync(param1);
            console.log(`Fitxer "${param1}" borrat.`);
        } catch(err) {
            console.error(`ERROR: No existeix el fitxer ${param1} i no es pot borrar.`);
        }        
    }, 3000);
}

setTimeout(() => {
    encrypt("fitxer_nou.b64", "fitxer_xifrat1.txt");
    encrypt("fitxer_nou.hex", "fitxer_xifrat2.txt");  
}, 2000);

//Crea una altra funció que desencripti i descodifiqui els fitxers de l'apartat anterior tornant a generar una còpia de l'inicial.

function decrypt(param1, param2, fn) {
    const algorithm = 'aes-192-cbc';
    const password = 'contrasenya-secreta';
    const key = crypto.scryptSync(password, 'salt', 24);
    const iv = Buffer.alloc(16, 0);
    const cipher = crypto.createDecipheriv(algorithm, key, iv);
    const input = fs.createReadStream(param1);
    const output = fs.createWriteStream(param2);
    console.log(`Fitxer "${param1}" desencriptat correctament.`);
    input.pipe(cipher).pipe(output);
    read2(param2);
}
setTimeout(() => {
    decrypt("fitxer_xifrat1.txt", "fitxer_nou2.b64");
    decrypt("fitxer_xifrat2.txt", "fitxer_nou2.hex");
}, 6000);

function noHex(param) {
    let bdc = new Buffer.from (param, "hex");
    let bdcs = bdc.toString("utf8");
    write("fitxer_nou2.hex", bdcs);
}
function noBase64(param) {
    let bdc = new Buffer.from (param, "base64");
    let bdcs = bdc.toString("utf8");
    write("fitxer_nou2.b64", bdcs);
}

function read2(param) {
    setTimeout(() => {  
        fs.readFile(param, 'utf-8', (err, data) => {
            if(err) {
                console.log('Error: ', err);
            } else if(param == "fitxer_nou2.b64") {
                noBase64(data);
            } else {
                noHex(data);
            }
        });
    }, 2000);
}