const { Console } = require('console');
const fs = require('fs');
const { resolve } = require('path');
const path = require('path');
const folderPath = '../BOG002-md-links-main'
const axios = require('axios').default;


const esDirectorio = ruta => fs.lstatSync(ruta).isDirectory();
const esArchivo = ruta => fs.lstatSync(ruta).isFile();

function searchPath(ruta) {
  const p = new Promise((resolve, reject) => {


    if (esDirectorio(ruta)) {  // condicional para saber si es un directorio

      const arrayArchivos = fs.readdirSync(folderPath); // lee el directorio y me entrega un array de archivos
      let arrayArchivosMd = []// array vacio
      arrayArchivos.forEach(archivo => {//iteramos con un foreach para que recorrer cada archivo
        let extraerRuta = path.basename(archivo);// utilizo basename para que me de el nombre de cada archivo
        let exRegMd = /[(0-9A-aZ-z)+[.*\)]+(md)/g; // funcion regular solo para archivos md
        let matchMd = extraerRuta.match(exRegMd);//aqui se hace el match con la expresion

        if (matchMd != null) {
          arrayArchivosMd.push(matchMd);
        }
      });
      let nuevoArray = arrayArchivosMd.flat();
      resolve(nuevoArray);


    }
    else if (esArchivo(ruta)) {
      let arrayArchivosMd = [];
      let extraerRuta = path.basename(ruta);// utilizo basename para que me de el nombre de cada archivo
      let exRegMd = /[(0-9A-aZ-z)+[.*\)]+(md)/g; // funcion regular solo para archivos md
      let matchMd = extraerRuta.match(exRegMd);
      if (matchMd != null) {
        arrayArchivosMd.push(matchMd);
      }
      let nuevoArray = arrayArchivosMd.flat();
      resolve(nuevoArray);
    }

  });
  return p;

}
var arrayGlobal = []

// searchPath(folderPath)
//   .then(file => {
//     extraerLinks(file).then(array => {
//       propiedades(array)

//     });
//   })

function extraerLinks(archivos) {
  const promesa2 = new Promise((resolve, reject) => {
    if (archivos) {

      archivos.forEach(ruta => {
        let leeArchivo = fs.readFileSync(ruta, 'utf8');
        let sacarRuta = ruta;

        let expRegular = /\[([^\[]+)\](\((http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-)])?)/gm;
        let result = leeArchivo.match(expRegular)

        result.forEach(links => {
          ;
          let separar = links.split(/\[([^\[]+)\]/g);

          separar.push(sacarRuta)
          arrayGlobal.push(separar);
          // console.log(arrayGlobal)

          resolve(arrayGlobal)

        });
      });

    }
    else {
      console.log("error")
    }
  });

  return promesa2

}

function propiedades(array) {

  let newArray = []
  array.forEach(propiedad => {
    let obj = new Object()
    let propiedad2 = propiedad[2].slice(1, -1)
    obj.href = propiedad2;
    obj.text = propiedad[1];
    obj.file = propiedad[3];


    newArray.push(obj);


    // peticionHttp(newArray)
    console.log ("probemos",newArray)

  })
  return newArray

}
// let arrayObjeto = propiedades(newArray)
// console.log(arrayObjeto)

let status_OK = "ok"
let status_fail = 'fail'


function peticionHttp(url) {
return Promise.all( url.map(elemtos => {

  // let promesa = new Promise((resolve,reject)=>{
  return axios
    .get(elemtos.href)
    .then(function (respo) {
      elemtos.code = respo.status;
      respo.status = status_OK;

      // let objeto=new Object()
      // objeto.status= elemtos.code;
      // objeto.mesaje=respo.status;
      // newArray.push(objeto)

      // console.log("dame el objeto",newArray)
    })
    .catch(function (error) {
      if (error.response) {
        error.response.status = status_fail;

        //  console.log("error",error.response.status);
      }

    })
.then(console.log(objeto))
})
)


}

const nuevaVariable=[  {
  href: 'https://nodejs.org/api/path.html',
  text: 'Path',
  file: 'README.md'
},
{
  href: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e',
  text: 'Linea de comando CLI',
  file: 'README.md'
},
{
  href: 'https://www.youtube.com/watch?v=Lub5qOmY4JQ',
  text: 'recurso',
  file: 'README.md'
}
]
peticionHttp(nuevaVariable)
// const arrayPromesas= nuevaVariable.map(peticionHttp)
// Promise.all(arrayPromesas).then(console.log)



