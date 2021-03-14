
![logo](https://github.com/luzciel/SCL015-md-links/blob/master/image/logo.png)

Md-links-luzciel es una libreria que lee y analiza archivos en formato markdown para verificar los links contenidos y reportar su estado (sin conexión, útiles o rotos) y dar algunas estadísticas que se imprimirán en consola como la cantidad de links, el estado de los links y  el total de links únicos.


## Instalación

* Instalar previamente npm y Node.js en tu computador.

* Para instalar la librería ejecuta el siguiente comando en la terminal:

```js
$ npm i md-links-luzciel
```
## Uso de la libreria

 En el archivo JS:

```js
const mdlinks = require('md-links-luzciel');   
```

En la terminal:
 ```
md-links <path-to-file> [options]   
```


### Opciones:

**Leer archivos con extensión .md**

 ```
md-links <path-to-file.md>   
```
![opcion file](https://github.com/luzciel/SCL015-md-links/blob/master/image/opcion-file.png)

En este caso se obtiene como resultado:
- File: Archivo o ruta donde fue encontrado el link.
- Href: Link encontrado.
- Text: Descripción del link.

**--validate**

Entrega la validacion o status de los links (status: 200, 404, 500 etc).

 ```
md-links <path-to-file.md> --validate  
```
![opcion validate](https://github.com/luzciel/SCL015-md-links/blob/master/image/validate.png)


**--stats**

Entrega las siguientes estadística: `Total` el total de links encontrados; `Unique` el total de links unicos.

 ```
md-links <path-to-file.md> --stats  
```

![opcion stats](https://github.com/luzciel/SCL015-md-links/blob/master/image/stats.png)


**--stats --validate**

Las dos opiciones combinadas, además de Total y Unique, agregan la siguiente estadística: `Broken` el total de links rotos;

`md-links <path-to-file.md> --stats --validate || md-links <path-to-file.md> --validate --stats`

![opcion stats and validate](https://github.com/luzciel/SCL015-md-links/blob/master/image/validate-stats.png)


## Diagrama de Flujo
![opcion validate and stats](https://github.com/luzciel/SCL015-md-links/blob/master/image/diagrama-de-flujo.png)

## Autor
* Luzciel Montesinos

