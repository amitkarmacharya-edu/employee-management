const mysql = require('mysql');

class DB {
    constructor(databaseName) {
        this.dbName = databaseName;
        this.con = null;
    }
}

module.exports = DB;