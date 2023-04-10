//Crea una funció que imprimeixi recursivament un missatge per la consola amb demores d'un segon.

(function repeat() {
    setInterval(() => {
        console.log("Bon dia!", new Date().toLocaleTimeString());
    }, 1000);
})();
