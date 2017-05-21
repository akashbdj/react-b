let fs = require('fs')
let config = {
    APP_PORT     : 8000,
    API_ROOT_URL : 'https://abc.com'
}

if (fs.existsSync('./config.local.js')) {
    config = Object.assign(config, require('./config.local.js'))
}

module.exports = config
