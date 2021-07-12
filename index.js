const { searchPath, extraerLinks,propiedades,peticionHttp} = require ('./prueba.js')

function md_Links(ruta, validate){
  return searchPath(ruta)
  .then(extraerLinks)
  .then( propiedades)
  .then(arrayObj => validate ? peticionHttp(arrayObj): arrayObj)

}
//  const mdLinks = md_Links('../BOG002-md-links-main',true)
//  mdLinks.then(console.log)
 
 module.exports={
   md_Links
 }


