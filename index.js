const fs = require('fs'); // fs es el módulo del sistema de archivos Node.js le permite trabajar con el sistema de archivos en su computadora.
const path = require('path'); //El path módulo proporciona utilidades para trabajar con rutas de archivos y directorios. 
const http = require('http');
const clc = require('cli-color');
const markdownIt = require('markdown-it')();
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fetchUrl = require("fetch").fetchUrl;
const resolve = require('path').resolve;
const { rejects } = require('assert');
const columns = require('cli-color/columns');
// resolve('../../bb/tmp.txt')

let allLinks = []
let detailsLinks = {};

const redColor = clc.red.bold;
const greenColor = clc.green.italic;
const greenColorBold = clc.green.bold;
const blueColor = clc.blue;
const magentaColor = clc.magenta;
const cyanColorBold = clc.cyan.bold;
const cyanColor= clc.cyan;

const allowedExtensions = /(.md|.markdown|.mdown|.mkdn|.mkd|.mdwn|.mdtxt|.text|.Rmd )$/i;

// Funcion que lee el archivo y devuelve getLink (array con link, el texto y el archivo)
const filePath = (fileRoute) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileRoute, { encoding: 'utf8' }, (err, data) => { // fs.readFile()método se utiliza para leer archivos en su computadora. Este devuleve un objeto Buffer (secuencia de bytes de longitud fija)
      if (data) {
          if (allowedExtensions.exec(path.extname(fileRoute))) { //El método exec() ejecuta una busqueda sobre las coincidencias de una expresión regular en una cadena especifica. Devuelve el resultado como array, o null.
            //path.extname () devuelve la extensión del path, desde la última aparición del carácter .(punto)  (ejemplo .js , .txt)
            const str = data.toString();
            resolve(getLink(str, fileRoute))
          } else {
            console.log(redColor('Error: Solo se permiten archivos con extension Markdown'));
          }
      } else {
        reject(console.log(redColor('Error: Ruta Invalida')))
      }
    });
  })
}

// Funcion que obtiene el link, el texto y el archivo 
const getLink = (fileMd, pathParameter) => {
  const renderHtml = markdownIt.render(fileMd); // convierte el archivo .md a html
  const domContent = new JSDOM(renderHtml); 
  const links = Array.from(domContent.window.document.querySelectorAll('a'));
  allLinks = [];
  links.forEach((link) => {
    if (link.href.includes("http")) {
      detailsLinks = {
        href: link.href,
        text: link.text,
        file: pathParameter,
      }
      allLinks.push(detailsLinks)
    } 
  })
  return allLinks
}

// Funcion que obtiene el estatus del Link
const linkStatus = (link) => {
  return new Promise((resolve, rejects) => {
    fetchUrl(link, (error, meta) => {
      if (meta) {
        resolve(meta.status);
      } else {
        rejects(error)
      }
    })
  })
}

// Funcion que obtiene los links Unicos
const uniqueLinks = (folder) => {
  const unique = [];
  filePath(folder)
    .then(res => {
      res.map((link) => {
        unique.push(link.href)
      })
      const mySet = new Set(unique);
      console.log(greenColorBold("Unique:", mySet.size))
    })
    .catch(err => {
      console.log(err)
    })
}

const opcionFile = (folder) => {
  filePath(folder)
    .then(res => {
      if(res.length < 1){
        console.log(redColor('Este archivo no contiene Links'))
      } else {
        res.map(element => {
          console.log(cyanColorBold('File: ' + element.file + '\n'), greenColor('href: ' + element.href + '\n'), blueColor('text: ' + element.text + '\n'));
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
}


const opcionValidate = (folder) => {
  filePath(folder)
    .then(res => {
      res.forEach((link) => {
        linkStatus(link.href)
          .then(response => {
            if (response >= 400) {
              console.log(cyanColor(link.file), greenColor(link.href), redColor(response), link.text, redColor('Fail'))
            } else {
              console.log(cyanColor(link.file), greenColor(link.href), blueColor(response), link.text, blueColor('OK'))
            }
          })
          .catch(err => {
            console.log(err)
          })
      })
    })
    .catch(err => {
      console.log(err)
    })
}


const opcionStats = (folder) => {
  filePath(folder)
    .then(res => {
      console.log(cyanColorBold('TOTAL:', res.length))
    })
    .catch(err => {
      console.log(err)
    })
}


const opcionStatsValidate = (folder) => {
  filePath(folder)
    .then(res => {
      const broken = [];
      res.forEach((link) => {
        broken.push(linkStatus(link.href));
      })
      Promise.all(broken)
        .then(response => {
          const result = response.filter(status => {
            if (status >= 400) {
              return status;
            }
          })
          console.log(cyanColorBold('Total:', res.length))
          console.log(redColor('Broken:', result.length))
        })
    })
    .catch(err => {
      console.log(err)
    })
}



module.exports = {
  filePath,
  opcionFile,
  opcionValidate,
  opcionStats,
  opcionStatsValidate,
  uniqueLinks
}
