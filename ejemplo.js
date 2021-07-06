function promesa(recibir){
    const p = new Promise ((resolve, reject) =>{
const ejemplo= recibir 
if (recibir == true){
    resolve("esto primero")
}
else{
    reject("error primero")
}
    });
    return p
}
promesa(false)
.then((entradaResolve)=>{ new Promise ((resolve,reject) =>{resolve("esto segundo"+entradaResolve)})
})
.then((entradaAnterior)=>{console.log("esto tercero"+entradaAnterior)})
.catch((entradaReject)=>{console.log("error segundo"+ entradaReject)})