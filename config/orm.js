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
        this.con.query(query, function(err, result){
            if(err) throw err;
            
            console.log("New Deaprtment Created");
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

    updateEmployeeManager(employe) {
        let query = `UPDATE employee SET manager_id=${employe.mID} WHERE id=${employe.eID}`;
        this.con.query(query, function(err, result){
            if(err) throw err;

            console.log("NEW MANAGER HAS BEEN ASSIGNED");
        });
    }

    updateEmployeeRole(employe) {
        let query = `UPDATE employee SET role_id=${employe.rID} WHERE id=${employe.eID}`;
        this.con.query(query, function(err, result){
            if(err) throw err;

            console.log("NEW ROLE HAS BEEN UPDATED");
        });
    }

    deleteRecordFrom(tableName, id) {
        let query = `DELETE FROM ${tableName} WHERE id = ${id};`;
        this.con.query(query, function(err, result){
            if(err) throw err;

            console.log("RECORD HAS BEEN DELETED");
        });
    }

}

module.exports = ORM;