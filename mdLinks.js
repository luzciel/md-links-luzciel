const fs = require('fs');
const path = require('path');
const clc = require('cli-color');
const {filePath, directoryPath, opcionFile, opcionValidate, opcionStats, opcionStatsValidate, uniqueLinks} = require('./index');


// Recibe una ruta
let folder = process.argv[2];
// Métodos de path que devuelven una ruta absoluta
folder = path.resolve(folder); // Absoluta
folder = path.normalize(folder); // normaliza y resuelve '..' y '.'
// const folder = process.argv[2];
const optionsArgv = process.argv[3];
const twoOptionsArgv = process.argv[4];
const redColor = clc.red.bold;
const greenColor = clc.green.italic;




const options = (folderParameter, optionsParameter, twoOptionsParameter) => {
  if (folderParameter && !optionsParameter ) {
    opcionFile(folderParameter)
  } else if (optionsParameter === '--validate' && !twoOptionsParameter) {
      opcionValidate(folderParameter)

  } else if (optionsParameter == '--stats' && !twoOptionsParameter) {
    opcionStats(folderParameter)
    uniqueLinks(folderParameter)

  } else if (optionsParameter == '--stats' && twoOptionsParameter === '--validate' || optionsParameter === '--validate' &&  twoOptionsParameter === '--stats' ) {
    opcionStatsValidate(folderParameter)
    uniqueLinks(folderParameter)

  } else {
    console.log(redColor("Error: Introduce un archivo valido"));
  }
}


  if (fs.lstatSync(folder).isFile()) {
        options(folder, optionsArgv, twoOptionsArgv );
    } else {
      console.log(redColor("Error: Solo se analizan Archivos"))
    }


