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
        console.log(option);
        switch (option) {
            case 0:
                await this.displayAllDataFrom('employee');
                this.promptMainMenu();
                break;
            case 1:
                await this.displayAllDataFrom('department');
                this.promptMainMenu();
                break;
            case 2:
                await this.displayAllDataFrom('role');
                this.promptMainMenu();
                break;
            case 3:
                await this.addNewEmployee();
                this.promptMainMenu();
                break;
            case 4:
                await this.createNewRole();
                this.promptMainMenu();
                break;
            case 5:
                await this.createNewDepartment();
                this.promptMainMenu();
                break;
            case 6:
                await this.updateEmployeeRole();
                this.promptMainMenu();
                break;
            default:
                this.quit();
                break;
        }

        
    }

    async displayAllDataFrom(tableName) {
        let allRows = await this.orm.getAllRowsFromTable(tableName);
        console.table(allRows);
    }

    async addNewEmployee() {
        // create list of all department
        let roles = await this.orm.getAllRowsFromTable('role');
        let rolesWithId = roles.map(r => {
            return { name: r.title, value: r.id }
        });
        this.questions.employee[2]['choices'] = rolesWithId;

        // create list of all department
        let employees = await this.orm.getAllRowsFromTable('employee');
        let managers = [{ name: 'NONE', value: 0 }];
        for (let employee of employees) {
            if (employee.role_id === 11) {
                managers.push(
                    {
                        name: employee.first_name + " " + employee.last_name,
                        value: employee.id
                    })
            }
        }

        this.questions.employee[3]['choices'] = managers;
        let employee = await inquirer.prompt(this.questions.employee);

        this.orm.addEmployee(employee);
        this.displayAllDataFrom('employee');
    }

    async createNewRole() {

        let listAllRoles = await this.orm.getAllRowsFromTable('role');
        let allRoles = listAllRoles.map(role => role.title);
        const validate = (input) => {
            if (allRoles.indexOf(input) !== -1) {
                console.log("Role already Exists");
                return false
            } else {
                return true;
            }
        }
        // create list of all department
        let departments = await this.orm.getAllRowsFromTable('department');
        let departmentWithId = departments.map(d => {
            return { name: d.name, value: d.id }
        });

        // add validate function
        this.questions.role[0]['validate'] = validate;
        // add the list of department as choices
        this.questions.role[2]['choices'] = departmentWithId;

        let newRole = await inquirer.prompt(this.questions.role);
        this.orm.addRole(newRole);
        this.displayAllDataFrom('role');

    }

    async createNewDepartment() {

        let listAllDept = await this.orm.getAllRowsFromTable('department');
        let departments = listAllDept.map(dept => {
            return { name: dept.name, value: dept.id }
        });

        const validate = (input) => {
            if (departments.indexOf(input) !== -1) {
                console.log("Department Already Exits");
                return false
            } else {
                return true;
            }
        }

        this.questions.department[0]['validate'] = validate;
        let newDept = await inquirer.prompt(this.questions.department);

        this.orm.addDepartment(newDept);
        this.displayAllDataFrom('department');
    }

    async updateEmployeeRole() {
        let employees = await this.orm.getAllRowsFromTable('employee');
        let employeesName = employees.map(e => {
           return { name: e.first_name + " " + e.last_name , value: e.id }
        });

        let roles = await this.orm.getAllRowsFromTable('role');
        let rolesID = roles.map(r => {
            return { name: r.title, value: r.id };
        })

        this.questions.updateEmployeeRole[0]['choices'] = employeesName;
        this.questions.updateEmployeeRole[1]['choices'] = rolesID;

        let newRole = await inquirer.prompt(this.questions.updateEmployeeRole);
        this.orm.updateEmployeeRole(newRole);

        this.listAllEmployee();

    }

    // display logo
    displayLogo() {
        // display the logo
        console.log(
            logo({
                name: 'Employee Management System',
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
                .center('Track Your Progress')
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