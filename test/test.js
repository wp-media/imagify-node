'use strict'


const
	Imagify   = require('../imagify/main.js')
	, imagify = new Imagify('123456')


let options = {
	level: 'ultra',
	keep_exif: true
}

imagify
	.optimize( 'sample.jpg', options )
	.then( response => {
		//console.log(response)
	})
	.catch( error => {
		//console.error(error)
	})
