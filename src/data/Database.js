const loki = require('lokijs')
const db = function() {
    return new loki('database.json')
}

module.exports = db