const fs = require('fs'); // fs es el módulo del sistema de archivos Node.js le permite trabajar con el sistema de archivos en su computadora.
const clc = require('cli-color');
// const directoryPath = require('./index')
// const { fetchUrl } = require('fetch');
const {filePath, directoryPath, opcionFile, opcionValidate, opcionStats, opcionStatsValidate, unico} = require('./index');

const folder = process.argv[2];  //comienza con 2 porque los dos primeros elementos en la matriz process.argv siempre es['path/to/node.exe', 'path/to/js/file', ...]
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
    unico(folderParameter)

  } else if (optionsParameter == '--stats' && twoOptionsParameter === '--validate' || optionsParameter === '--validate' &&  twoOptionsParameter === '--stats' ) {
    opcionStatsValidate(folderParameter)
    unico(folderParameter)

  } else {
    console.log("Error instrucciones");
  }
}



// const commandLineInterface = (folderParameter) => {
  if (fs.lstatSync(folder).isFile()) {
      console.log(greenColor("Es un archivo"))
        options(folder, optionsArgv, twoOptionsArgv );
    } else {
      console.log(greenColor("Es una carpeta"))
      directoryPath(folder)
      .then(rest => {
        // console.log(666666, rest)
        filePath(rest)
        .then(res => {
          // console.log(res)
          options(res, optionsArgv, folder, twoOptionsArgv );
        })
        .catch(err =>{
          console.log(err)
        })
        // options(rest, optionsArgv, folder, twoOptionsArgv );
      })
      .catch(err =>{
        console.log(err)
      })
    }
// }
// }

