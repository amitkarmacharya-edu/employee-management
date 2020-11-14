const mysql = require('mysql');

class ORM {

    constructor(connection) {
        this.con = connection;
    }

    endConnection() {
        this.con.end();
        console.log("DB connection has ended.");
    }

    getAllRowsFromTable(tableName) {
        let query = `SELECT * from ??`;
        return new Promise((resolve, reject) => {
            this.con.query(query, [tableName], function (err, result) {
                if (err) {
                    reject(new Error("Error while fetching list of all " + tableName, err));
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

            console.log("New Role Created");
        });
        
    }

    updateEmployeeRole(employe) {
        let query = `UPDATE employee SET role_id=${employe.rID} WHERE id=${employe.eID}`;
        this.con.query(query, function(err, result){
            if(err) throw err;

            console.log("NEW ROLE HAS BEEN UPDATED");
        });
    }

}

module.exports = ORM;