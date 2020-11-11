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

    getDataFromEmployee() {
        let query = `SELECT * from employee`;
        let con = this.con;
        return new Promise(function (resolve, reject) {
            con.query(query, function (err, result) {
                if (err) {
                    reject(new Error("Error while fetching list of all employees", err));
                } else {
                    resolve(result);
                }
            });
        }); 
    }

    getDataFromDepartment() {
        let query = `SELECT * from department`;
        let con = this.con;
        return new Promise(function (resolve, reject) {
            con.query(query, function (err, result) {
                if (err) {
                    reject(new Error("Error while fetching list of all employees", err));
                } else {
                    resolve(result);
                }
            });
        }); 
    }

    getDataFromRoles() {
        let query = `SELECT * from role`;
        let con = this.con;
         return new Promise(function (resolve, reject) {
            con.query(query, function (err, result) {
                if (err) {
                    reject(new Error("Error while fetching list of all employees", err));
                } else {
                    resolve(result);
                }
            });
        });
    }


}

module.exports = DB;