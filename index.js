// module.exports = () => {
//   // ...

// };

// const welcome = 'HELLO WORLD'
// console.log(welcome)

const fs = require('fs'); // fs es el módulo del sistema de archivos Node.js le permite trabajar con el sistema de archivos en su computadora.
const path = require('path'); //El path módulo proporciona utilidades para trabajar con rutas de archivos y directorios. 
const http = require('http');


// const file = process.argv[2]; //comienza con 2 porque los dos primeros elementos en la matriz process.argv siempre es['path/to/node.exe', 'path/to/js/file', ...]
const folder = process.argv[2];

// fs.readFile(file, { encoding: 'utf8' }, (err, data) => { // fs.readFile()método se utiliza para leer archivos en su computadora. Este devuleve un objeto Buffer (secuencia de bytes de longitud fija)
// // Si no hay errores, 'data' será un objeto Buffer de Node.js. Al igual que pasa con readFileSync(), puedes pasar 'utf8' como segundo parámetro y
// // luego el callback como tercero de modo de que data sea un String y no un Buffer.
//   if (data) {
//     const str = data.toString();
//     console.log(str)
//   } else {
//     console.log('Error: Ruta Invalida');
//     console.log(err.message);
//   }
// });
  

  fs.readdir(folder, (err, files) => {
    if(err){
      console.log('Directorio no encontrado');
      console.log(err.me)
    } else {
      files.forEach(file => {
        console.log(file);
      });
    }
  });

