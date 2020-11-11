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

    addEmployee(employee) {
        console.log(employee);
        let { fN, lN, rID, mID } = employee;
        let query = `INSERT INTO employee (first_name, last_Name, role_id, manager_id) VALUES('${fN}', '${lN}', '${rID}', '${mID}')`;
        let con = this.con;
        console.log(query);
        return new Promise(function (resolve, reject) {
            con.query(query, function (err, result) {
                if (err) {
                    reject(new Error("Error while fetching list of all employees", err));
                } else {
                    resolve(result);
                    console.log("EMPLOYEE ADDED");
                }
            });
        });
    }

    addDepartment(dept) {
        let query = `INSERT INTO department(name) VALUES('${dept.name}')`;
        this.con.query(query, function(err, result){
            if(err) throw err;
            
            console.log("New Deaprtment Created");
        });
    }

    addRole(role) {
        let { title, salary, dID } = role;
        let query = `INSERT INTO role (title, salary, department_id) VALUES('${title}', '${salary}', '${dID}')`;
        this.con.query(query, function(err, result){
            if(err) throw err;

            console.log("New Role Added");
        });
        
    }

    updateEmployeeRole(employe) {
        let query = `UPDATE employee SET role_id=${employe.rID} WHERE id=${employe.eID}`;
        this.con.query(query, function(err, result){
            if(err) throw err;

            console.log("NEW ROLE HAS BEEN ASSIGNED");
        });
    }

}

module.exports = DB;