const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')

async function bancoDeDados() {

    const db = await sqlite.open({
        filename: path.resolve(__dirname, 'bancoDeDados.db'),
        driver: sqlite3.Database
    });

    return db
    
}

module.exports = bancoDeDados