const inquirer = require("inquirer");
const questionList = require('./questions');
const logo = require('asciiart-logo');
const DB = require("../db/employee_management_db");
const { Console } = require("console");


class EmployeeManagementSystem {
    constructor(questionList) {
        this.questions = questionList;
        this.db = new DB("employee_management_db");
    }

     // start of the app
     launch() {
        this.displayLogo();
        // connect to the employee_management_db
        this.db.createConnection();
        // ask initial questions
        this.promptMainMenu();
    }

    async promptMainMenu() {
        const { option } = await inquirer.prompt(this.questions.mainMenu);
        console.log(option);
        switch (option) {
            case 0:
                this.listAllEmployee();
                break;
            case 1:
                this.listAllDepartment();
                break;
            case 2:
                this.listAllRoles();
                break;
            case 3:
                this.addNewEmployee();
                break;
            case 4:
                this.createNewRole();
                break;
            case 5:
                this.createNewDepartment();
                break;
            case 6:
                this.updateEmployeeRole();
                break;
            default:
                this.quit();
                break;
        }
    }

    async listAllEmployee() {
        let listOfAllEmployees = await this.db.getDataFromEmployee();
        console.table(listOfAllEmployees);
        this.promptMainMenu();
    }

    async listAllDepartment() {
        let listOfAllDepartments = await this.db.getDataFromDepartment();
        console.table(listOfAllDepartments);
        this.promptMainMenu();
    }

    async listAllRoles() {
        let listOfAllRoles = await this.db.getDataFromRoles();
        console.table(listOfAllRoles);
        this.promptMainMenu();
    }

    async addNewEmployee() {
        // create list of all department
        let roles = await this.db.getDataFromRoles();
        let rolesWithId = roles.map(r => {
            return { name: r.title, value: r.id }
        });
        this.questions.employee[2]['choices'] = rolesWithId;

        // create list of all department
        let employees = await this.db.getDataFromEmployee();
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

        this.db.addEmployee(employee);
        this.listAllEmployee();
    }

    async createNewRole() {

        let listAllRoles = await this.db.getDataFromRoles();
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
        let departments = await this.db.getDataFromDepartment();
        let departmentWithId = departments.map(d => {
            return { name: d.name, value: d.id }
        });

        // add validate function
        this.questions.role[0]['validate'] = validate;
        // add the list of department as choices
        this.questions.role[2]['choices'] = departmentWithId;

        let newRole = await inquirer.prompt(this.questions.role);
        this.db.addRole(newRole);
        this.listAllRoles();

    }

    async createNewDepartment() {

        let listAllDept = await this.db.getDataFromDepartment();
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

        this.db.addDepartment(newDept);
        this.listAllDepartment();
    }

    async updateEmployeeRole() {
        let employees = await this.db.getDataFromEmployee();
        let employeesName = employees.map(e => {
           return { name: e.first_name + " " + e.last_name , value: e.id }
        });

        let roles = await this.db.getDataFromRoles();
        let rolesID = roles.map(r => {
            return { name: r.title, value: r.id };
        })

        this.questions.updateEmployeeRole[0]['choices'] = employeesName;
        this.questions.updateEmployeeRole[1]['choices'] = rolesID;

        let newRole = await inquirer.prompt(this.questions.updateEmployeeRole);
        this.db.updateEmployeeRole(newRole);

        this.listAllEmployee();

    }

     // exit the program
     quit() {
        this.db.endConnection();
        console.log("\nGoodbye!");
        process.exit(0);
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
}