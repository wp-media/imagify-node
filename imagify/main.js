'use strict'


const
	API_ENDPOINT = 'https://app.imagify.io/api'
	, request    = require('request')
	, fs         = require('fs')
	, extend     = require('extend')
	, mime       = require('mime')


class Imagify {

	/**
	 * Constructor
	 * @param  {string} api_key Your API key (visit https://app.imagify.io/#/api)
	 */
	constructor (api_key) {
		if ( !api_key || 'string' !== typeof(api_key) ) throw new Error('API key is invalid or not set!')

		this.api_key = api_key
	}

	/**
	 * Optimize
	 * @param  {string} source  Image or folder path
	 * @param  {object} options Optimization options (visit https://imagify.io/docs/api/?python#upload-and-optimize-an-image)
	 */
	optimize (input, options) {

		fs.accessSync(path[, mode])
		
		let
			file_stats        = null
			, default_options = {
				level: 'aggressive',
				resize: {
					width: false,
					height: false,
					percentage: false
				},
				keep_exif: false
			}

		options = extend( default_options, options || {} )

		console.log( mime.lookup(input) )
		
		/*try {
			file_stats = fs.statSync( input )
		} catch (e) {
			throw new Error('Image not found!')
		}

		let form_data = {
			image: fs.createReadStream( input )
		}*/

		return new Promise( (resolve, reject) => {
			resolve()	
		})

		request.post({
			url: API_ENDPOINT + '/upload',
			formData: form_data
		}, (err, httpResponse, body) => {
			if (err) {
				reject(err)
			} else {
				resolve(body)
			}
		})
	}

	isValidFile (file) {
		
	}
}


module.exports = Imagify
