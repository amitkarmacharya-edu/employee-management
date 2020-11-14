const inquirer = require("inquirer");
const logo = require('asciiart-logo');
const ORM = require('../config/orm.js');
const { Console } = require("console");

class EmployeeManagementSystem {

    constructor(questionList, connection) {
        this.questions = questionList;
        this.orm = new ORM(connection);
    }

    // start of the app
    launch() {
        this.displayLogo();
        // ask initial questions
        this.promptMainMenu();
    }

    async promptMainMenu() {
        const { option } = await inquirer.prompt(this.questions.mainMenu);
        let data;
        switch (option) {
            case 0:
                data = await this.getAllDataFromTable('employee');
                // ask new questions
                this.render(data, "EMPLOYEE TABLE");
                break;
            case 1:
                data = await this.getAllDataFromTable('department');
                // ask new questions
                this.render(data, "DEPARTMENT TABLE");
                break;
            case 2:
                data = await this.getAllDataFromTable('role');
                // ask new questions
                this.render(data, "ROLE TABLE");
                break;
            case 3:
                data = await this.getAllDataFromTable('employee');
                console.table(data);
                await this.addNewEmployee();
                break;
            case 4:
                data = await this.getAllDataFromTable('role');
                console.table(data);
                await this.createNewRole();
                break;
            case 5:
                data = await this.getAllDataFromTable('department');
                console.table(data);
                await this.createNewDepartment();
                break;
            case 6:
                data = await this.getAllDataFromTable('employee');
                console.table(data);
                await this.updateEmployeeRole();
                break;
            case 7:
                data = await this.getAllDataFromTable('employee');
                console.table(data);
                await this.updateEmployeeManager();
                break;
            case 8:
                data = await this.getAllDataFromTable('employee');
                console.table(data);
                await this.deleteFromEmployee();
                break;
            case 9:
                data = await this.getAllDataFromTable('department');
                console.table(data);
                await this.deleteFromDepartment();
                break;
            case 10:
                data = await this.getAllDataFromTable('role');
                console.table(data);
                await this.deleteFromRole();
                break;
            case 11:
                data = await this.getEmployeesByManager();
                this.render(data, "EMPLOYEES BY MANAGER");
                break;
            case 12:
                data = await this.getBudjetForAllDepartment();
                this.render(data, "BUDJET FOR ALL DEPARTMENT");
                break;
            default:
                this.quit();
                break;
        }
        
    }

    async getAllDataFromTable(tableName) {
        return await this.orm.getAllRowsFromTable(tableName);  
    }

    async addNewEmployee() {
        // create list of all role
        let roles = await this.getAllDataFromTable('role');
        let managerID;
        let rolesWithId = roles.map(r => {
            if (r.title === "Manager"){
                managerID = r.id;
            }
            return { name: r.title, value: r.id }
        });
        // get manager id

        // create list of all managers
        let employees = await this.getAllDataFromTable('employee');
        let managers = [{ name: 'NONE', value: 0 }];
        for (let employee of employees) {
            if (employee.role_id === managerID) {
                managers.push(
                    {
                        name: employee.first_name + " " + employee.last_name,
                        value: employee.id
                    })
            }
        }

        // create new question with list of managers and roles 
        let questionsToAddNewEmployee = this.questions.employee;
        questionsToAddNewEmployee[2]['choices'] = rolesWithId;
        questionsToAddNewEmployee[3]['choices'] = managers;

        // ask questio
        let employee = await inquirer.prompt(questionsToAddNewEmployee);

        this.orm.addEmployee(employee);

        let employeeTable = await this.getAllDataFromTable('employee');
        this.render(employeeTable, "EMPLOYEE TABLE");
    }

    async createNewRole() {

        let listAllRoles = await this.getAllDataFromTable('role');
        let allRoles = listAllRoles.map(role => role.title);
        const validate = (input) => {
            let re = /^[A-Za-z]+$/;
            if(!re.test(input)) {
                console.log("\x1b[31m","\n can only be alphabets");
                return false;
            }

            if (allRoles.indexOf(input) !== -1) {
                console.log("\nRole already Exists");
                return false
            } else {
                return true;
            }
        }
        // create list of all department
        let departments = await this.getAllDataFromTable('department');
        let departmentWithId = departments.map(d => {
            return { name: d.name, value: d.id }
        });

        // add validate function
        this.questions.role[0]['validate'] = validate;
        // add the list of department as choices
        this.questions.role[2]['choices'] = departmentWithId;

        let newRole = await inquirer.prompt(this.questions.role);
        this.orm.addRole(newRole);

        let roleTable = await this.getAllDataFromTable('role');
        this.render(roleTable, 'ROLE TABLE');

    }

    async createNewDepartment() {

        let listAllDept = await this.getAllDataFromTable('department');
        let departmentNames = [];
        let departments = listAllDept.map(dept => {
            departmentNames.push(dept.name)
            return { name: dept.name, value: dept.id }
        });

        const validate = (input) => {

            let re = /^[A-Za-z]+$/;
            if(!re.test(input)) {
                console.log("\x1b[31m","\n can only be alphabets");
                return false;
            }

            if(!input){
                console.log("\ncannot be empty");
                return false;
            }

            if (departmentNames.indexOf(input) !== -1) {
                console.log("\nDepartment Already Exits");
                return false;
            } else {
                return true;
            }
        }

        this.questions.department[0]['validate'] = validate;
        let newDept = await inquirer.prompt(this.questions.department);

        this.orm.addDepartment(newDept);
        
        let departmentTable = await this.getAllDataFromTable('department');
        this.render(departmentTable, "DEPARTMENT TABLE");
    }

    async updateEmployeeRole() {
        let employees = await this.getAllDataFromTable('employee');
        let employeesName = employees.map(e => {
           return { name: e.first_name + " " + e.last_name , value: e.id }
        });

        let roles = await this.getAllDataFromTable('role');
        let rolesID = roles.map(r => {
            return { name: r.title, value: r.id };
        })

        this.questions.updateEmployeeRole[0]['choices'] = employeesName;
        this.questions.updateEmployeeRole[1]['choices'] = rolesID;

        let newRole = await inquirer.prompt(this.questions.updateEmployeeRole);

        this.orm.updateEmployeeRole(newRole);

        let emploeesTable = await this.getAllDataFromTable('employee');
        this.render(emploeesTable, "EMPLOYEE TABLE");

    }

    async updateEmployeeManager() {
        // create list of all role
        let roles = await this.getAllDataFromTable('role');
        let managerID;
        for(let r of roles) {
            if (r.title === "Manager"){
                managerID = r.id;
            }
        }
            
        // create list of all managers
        let employees = await this.getAllDataFromTable('employee');
        
        let managers = [{ name: 'NONE', value: 0 }];
        for (let employee of employees) {
            if (employee.role_id === managerID) {
                managers.push(
                    {
                        name: employee.first_name + " " + employee.last_name,
                        value: employee.id
                    })
            }

        }

        this.questions.updateEmployeeManager[1]['choices'] = managers;

        let newRole = await inquirer.prompt(this.questions.updateEmployeeManager);
        console.log(newRole);
        this.orm.updateEmployeeManager(newRole);

        let emploeesTable = await this.getAllDataFromTable('employee');
        this.render(emploeesTable, "EMPLOYEE TABLE");

    }

    async deleteFromDepartment() {
        let department = await inquirer.prompt(this.questions.deleteDepartment);
        this.orm.deleteRecordFrom('department', department.dID);
        
        let departments = await this.getAllDataFromTable('department');
        this.render(departments, 'DEPARTMENT TABLE');
    }

    async deleteFromEmployee() {
        let employee = await inquirer.prompt(this.questions.deleteEmployee);
        this.orm.deleteRecordFrom('employee', employee.eID);
        
        let employees = await this.getAllDataFromTable('employee');
        this.render(employees, 'EMPLOYEE TABLE');
    }

    async deleteFromRole() {
        let role = await inquirer.prompt(this.questions.deleteRole);
        this.orm.deleteRecordFrom('role', role.rID);
        
        let roles = await this.orm.getAllRowsFromTable('role');
        this.render(roles, 'ROLE TABLE');
    }

    async getEmployeesByManager() {
        return await this.orm.allEmployeeByManagers();
    }

    async getBudjetForAllDepartment() {
        return await this.orm.totalDepartmentBudjet();
    }

    // render data()
    render(data,heading){
        console.clear();
        this.displayLogo();
        console.log(heading);
        console.table(data);
        this.promptMainMenu();
    }

    // display logo
    displayLogo() {
        // display the logo
        console.log(
            logo({
                name: 'EMS',
                // font: '3D-ASCII',
                font: 'ANSI Shadow',
                linechars: 100,
                padding: 2,
                margin: 3,
                borderColor: 'green',
                logoColor: 'bold-cyan',
                textColor: 'orange',
            })
                .emptyLine()
                .right('version: 1.0')
                .emptyLine()
                .center('Employee Management System')
                .render()
        );

    }

     // exit the program
     quit() {
        this.orm.endConnection();
        console.log("\nGoodbye!");
        process.exit(0);
    }

}

module.exports = EmployeeManagementSystem;