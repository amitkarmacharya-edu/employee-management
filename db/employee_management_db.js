const mysql = require('mysql');

class DB {
    constructor(databaseName) {
        this.dbName = databaseName;
        this.con = null;
    }


    createConnection() {
        this.con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: this.dbName
        });

        this.con.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
        });
    }

    endConnection() {
        this.con.end();
        console.log("DB connection Ended");
    }

}

module.exports = DB;