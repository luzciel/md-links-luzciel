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
const cyanColor = clc.cyan.bold;

const allowedExtensions = /(.md|.markdown|.mdown|.mkdn|.mkd|.mdwn|.mdtxt|.text|.Rmd )$/i;  // Extenciones permitidas  Porque sucede esto??


const filePath = (fileRoute) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileRoute, { encoding: 'utf8' }, (err, data) => { // fs.readFile()método se utiliza para leer archivos en su computadora. Este devuleve un objeto Buffer (secuencia de bytes de longitud fija)
      if (data) {
        const str = data.toString();
        resolve(getLink(str, fileRoute))
      } else {
        reject(console.log(redColor('Error: Ruta Invalida')))
      }
    });
  })
}

// Funcion que obtiene el link, el texto y el archivo 
const getLink = (fileMd, pathParameter) => {
  tokens = markdownIt.render(fileMd); // convierte el archivo .md a html
  const domContent = new JSDOM(tokens); // 
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


const opcionFile = (folder) => {
  filePath(folder)
    .then(res => {
      res.map(element => {
        console.log(cyanColor(element.file), greenColor(element.href), blueColor(element.text));
      })
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
      console.log(cyanColor('TOTAL:', res.length))
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
          console.log(cyanColor('Total:', res.length))
          console.log(redColor('Broken:', result.length))
        })
    })
    .catch(err => {
      console.log(err)
    })
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



const unico = (folder) => {
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




const directoryPath = (pachParameter) => {
  return new Promise((resolve, reject) => {
    fs.readdir(pachParameter, (err, data) => {
      if (err) {
        reject(console.log(clc.red('Directorio no encontrado')));
        console.log(err.me)
      } else {
        filter = []
        data.forEach(file => {
          if (allowedExtensions.exec(path.extname(file))) { //El método exec() ejecuta una busqueda sobre las coincidencias de una expresión regular en una cadena especifica. Devuelve el resultado como array, o null.
            //path.extname () devuelve la extensión del path, desde la última aparición del carácter .(punto)  (ejemplo .js , .txt)
            filter.push(file)
          }
        });
        if (filter.length === 0) { // Object.entries devuelve una lista con las claves y valores del objeto. En caso el objeto sea vacío va a devolver un array vacío.
          console.log(redColor('No se econtraron archivos con extension Markdown'));
        } else {
          filter.forEach(fileMarkdown => {
            const absolutePath = `${pachParameter}\\${fileMarkdown}`;
            resolve(filePath(absolutePath)
              .then(res => {
                console.log(333, res);
              })
              .catch(err => {
                console.log(err)
              }))
          })
        }
      }
    });
  })
}


module.exports = {
  directoryPath,
  filePath,
  opcionFile,
  opcionValidate,
  opcionStats,
  opcionStatsValidate,
  unico
}
