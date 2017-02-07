const
    API_ENDPOINT         = 'https://app.imagify.io/api'
    , ALLOWED_EXTENSIONS = ['.jpg','.jpeg','.png','.gif']
    , fs                 = require('fs')
    , path               = require('path')
    , request            = require('request')
    , EventEmitter       = require('events')


class Imagify extends EventEmitter {

    constructor (api_key = '') {
        super()
        if (!api_key.length) throw new Error('API_KEY is required')
        this.api_key = api_key
        this.images_list = []
    }

    getImageStats (image_path) {
        image_path = path.resolve(image_path)

        return new Promise( (resolve, reject) => {
            fs.stat( image_path, (err, stats) => {
                if (err) {
                    reject(err.message)
                    return
                }

                if ( !stats.isFile() ) {
                    reject(`${image_path} is not a file`)
                    return
                }

                let file_extension = path.extname(image_path)

                if ( ALLOWED_EXTENSIONS.indexOf(file_extension) < 0 ) {
                    reject(`${image_path} is not a valid image`)
                    return
                }

                resolve({
                    name: path.basename(image_path),
                    path: image_path,
                    size: stats.size,
                })
            })
        })
    }

    addImages (images_path) {
        return new Promise( (resolve, reject) => {
            this.images_list = []

            if (!images_path) {
                reject('No valid image')
                return
            }

            images_path.forEach( image_path => {
                
                this.getImageStats(image_path)
                    .then( stats => {
                        this.images_list.push(stats)
                        
                        if ( this.images_list.length == images_path.length ) {
                            resolve(this.images_list)
                        }
                    })
                    .catch( err => reject(err) )
                
            })
        })
    }

    upload (data) {
        let form_data = {
            image: fs.createReadStream(data.path)
        }

        request.post({
            url: API_ENDPOINT + '/upload/',
            headers: {
                'Authorization': 'token ' + this.api_key
            },
            formData: form_data
        }, (err, httpResponse, body) => {
            if (err) {
                this.emit('optimizationError', err)
            } else {
                this.emit('optimizationSuccess', JSON.parse(body))
            }
        })
    }

    process (data) {
        data.forEach(this.upload.bind(this))
    }

    optimize (...images_path) {
        const flatten = arr => Array.isArray(arr) ? [].concat( ...arr.map(flatten) ) : arr

        images_path = flatten(images_path)

        this
            .addImages(images_path)
            .then( data => {
                this.emit('beforeUploads', data)
                this.process(data)
            })
            .catch( err => {
                this.emit('imagesError', err)
            })
    }

}


module.exports = Imagify
