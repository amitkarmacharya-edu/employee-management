const questions = {
    mainMenu: [{
        type: 'list',
        name: 'option',
        message: 'List of Commands',
        choices: [
            { name: 'LIST ALL EMPLOYEES', value: 0 },
            { name: 'LIST ALL DEPARTMENTS', value: 1 },
            { name: 'LIST ALL ROLES', value: 2 },
            { name: 'ADD NEW EMPLOYEE', value: 3 },
            { name: 'CREATE NEW ROLE', value: 4 },
            { name: 'CREATE NEW DEPARTMENT', value: 5 },
            { name: 'UPDATE EMPLOYEE ROLE', value: 6 },
            { name: 'EXIT', value: 7 }
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
            type: 'list',
            name: 'rID',
            message: 'Select a role',
            choices: []
        },
        {
            type: 'list',
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
            type: 'list',
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
            type: 'list',
            name: 'eID',
            message: 'SELECT EMPLOYEE',
            choices: []
        },
        {
            type: 'list',
            name: 'rID',
            message: 'ASSIGN NEW ROLE',
            choices: []
        }
    ]

};

module.exports = questions;