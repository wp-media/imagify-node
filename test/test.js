const
    Imagify   = require('../index')
    , imagify = new Imagify(process.env.api_key)

let images = [
    '/Users/sebastien/www/node-imagify/test/sample_1.jpg',
    '/Users/sebastien/www/node-imagify/test/sample_2.jpg',
]

imagify
    .on('beforeUploads', data => {
        console.log('beforeUploads', data)
    })
    .on('imagesError', err => {
        console.log('imagesError', err)
    })
    .on('optimizationError', err => {
        console.log('uploadError', err)
    })
    .on('optimizationSuccess', msg => {
        console.log('uploadSuccess', msg)
    })

imagify.optimize(images)