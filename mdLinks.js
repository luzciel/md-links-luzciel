// const welcome = 'HELLO WORLD'
// console.log(welcome)
const fs = require('fs'); // fs es el módulo del sistema de archivos Node.js le permite trabajar con el sistema de archivos en su computadora.
const clc = require('cli-color');
// const directoryPath = require('./index')
const {filePath, directoryPath} = require('./index')

const folder = process.argv[2];  //comienza con 2 porque los dos primeros elementos en la matriz process.argv siempre es['path/to/node.exe', 'path/to/js/file', ...]
const redColor = clc.red.bold;
const greenColor = clc.green.italic;
const optionsArgv = process.argv[3];
const twoOptionsArgv = process.argv[4];

const commandLineInterface = (folderParameter) => {
  if (fs.lstatSync(folderParameter).isFile()) {
      console.log(greenColor("Es un archivo"))
       filePath(folder)
    } else {
      console.log(greenColor("Es una carpeta"))
      directoryPath(folderParameter);
    }
}

const options = (optionsParameter, folderParameter, twoOptionsParameter) => {
  if (folderParameter && !optionsParameter ) {
    console.log("entro al commandLineInterface()")
    commandLineInterface(folderParameter);
  } else if (optionsParameter === '--validate' && !twoOptionsParameter) {
      console.log("entro al --validate");

  } else if (optionsParameter == '--stats' && !twoOptionsParameter) {
    console.log("entro al -stats");

  } else if (optionsParameter == '--stats' && twoOptionsParameter === '--validate' || optionsParameter === '--validate' &&  twoOptionsParameter === '--stats' ) {
    console.log("entro al --stats --validate");

  } else {
    console.log("Error instrucciones");
  }
  }

options(optionsArgv, folder, twoOptionsArgv );
