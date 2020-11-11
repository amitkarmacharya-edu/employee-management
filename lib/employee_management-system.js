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