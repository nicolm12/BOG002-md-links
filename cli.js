#!/usr/bin/env node
const mdLinks = require("./index.js")
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv
const [, , ...args] = process.argv;
const path = args[0];


if(argv.validate || argv.v){
let bolean= true

    mdLinks.md_Links(path,bolean).then(array => {
        array.forEach(object => {
            console.table({
                File: object.file,
                href: object.href,
                text: object.text,
                status: object.status,
                mesaje: object.mesaje
            })
        })
})
}
else if (argv.stats || argv.s) {
    mdLinks.md_Links(path).then(array => {
        console.table({total :
        array.length})
        

    })
}
else if((argv.stats && argv.validate )|| argv.s &&  argv.v ){
console.log("si funciona")
}
else{
    bolean=false
    mdLinks.md_Links(path,bolean).then(array => {
        array.forEach(object => {
            console.table({
                File: object.file,
                href: object.href,
                text: object.text,
            })
        })
})
}


