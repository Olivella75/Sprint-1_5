// Crea una funció que comprimeixi el fitxer del nivell 1

const zlib = require('zlib');
const fs = require('fs');

function compress() {
    let gzip = zlib.createGzip();
    let r = fs.createReadStream('./fitxer_nou.txt');
    let w = fs.createWriteStream('./fitxer_comprimit.txt.gz');
    r.pipe(gzip).pipe(w);
}
compress();