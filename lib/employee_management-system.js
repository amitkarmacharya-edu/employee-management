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