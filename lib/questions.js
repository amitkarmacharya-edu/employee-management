const questions = {
    mainMenu: [{
        type: 'rawlist',
        name: 'option',
        message: 'Select a Commands',
        choices: [
            { name: 'list ALL EMPLOYEES', value: 0 },
            { name: 'list ALL DEPARTMENTS', value: 1 },
            { name: 'list ALL ROLES', value: 2 },
            { name: 'ADD NEW EMPLOYEE', value: 3 },
            { name: 'CREATE NEW ROLE', value: 4 },
            { name: 'CREATE NEW DEPARTMENT', value: 5 },
            { name: 'UPDATE EMPLOYEE ROLE', value: 6 },
            { name: 'UPDATE EMPLOYEE Manager', value: 7 }, 
            { name: 'DELETE Employee', value: 8 }, 
            { name: 'DELETE Department', value: 9 },
            { name: 'UPDATE ROLE', value: 10 },   
            { name: 'EXIT', value: 11 }
        ]
    }],
    employee: [
        {
            type: 'input',
            name: 'fN',
            message: 'Enter his/her first name'
        },
        {
            type: 'input',
            name: 'lN',
            message: 'Enter his/her last name'
        },
        {
            type: 'rawlist',
            name: 'rID',
            message: 'Select a role',
            choices: []
        },
        {
            type: 'rawlist',
            name: 'mID',
            message: 'Select a manager',
            choices: []
        },
        
    ],
    role: [
        {
            type: 'input',
            name: 'title',
            message: 'Enter a new Role',
        },

        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary'
        },
        {
            type: 'rawlist',
            name: 'dID',
            message: 'Select a Department',
        },

    ],
    department: [
        {
            type: 'input',
            name: 'name',
            message: 'Enter new Department',
        }
    ],
    updateEmployeeRole: [
        {
            type: 'rawlist',
            name: 'eID',
            message: 'SELECT EMPLOYEE',
            choices: []
        },
        {
            type: 'rawlist',
            name: 'rID',
            message: 'ASSIGN NEW ROLE',
            choices: []
        }
    ]

};

module.exports = questions;