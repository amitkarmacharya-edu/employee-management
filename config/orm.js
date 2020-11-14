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
        let query = `SELECT * FROM ${tableName} t INNER JOIN department d ON t.department_id = d.id`;
        return new Promise((resolve, reject) => {
            this.con.query(query, function (err, result) {
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

    allEmployeeByManagers() {
        let query = `
        SELECT 
            CONCAT(m.last_Name, ', ', m.first_Name) AS Manager,
            m.id AS manager_id,
            CONCAT(e.last_Name, ', ', e.first_Name) AS employee,
            e.id AS employee_id
        FROM
            employee e
        INNER JOIN employee m ON 
            m.id = e.manager_id
        ORDER BY 
            Manager;`;
        return new Promise((resolve, reject) => {
            this.con.query(query, function (err, result) {
                if (err) {
                    reject(new Error("Error while fetching list of all " + tableName, err));
                } else {
                    resolve(result);
                }
            });
        }); 
    }

    totalDepartmentBudjet() {
        let query = `SELECT department.id, department.name, SUM(total_budjet.total_salary) as total_budjet 
        FROM (SELECT role.department_id as dept_id, SUM(salary) as total_salary
        FROM employee 
        INNER JOIN role on employee.role_id = role.id 
        GROUP BY ROLE.id) as total_budjet 
        INNER JOIN department on department.id = total_budjet.dept_id
        GROUP BY department.id;`;
        return new Promise((resolve, reject) => {
            this.con.query(query, function (err, result) {
                if (err) {
                    reject(new Error("Error while fetching all department's budjet ", err));
                } else {
                    resolve(result);
                }
            });
        }); 
    }

}

module.exports = ORM;