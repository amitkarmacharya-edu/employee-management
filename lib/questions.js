const Validate = require('./helper.js');

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
            { name: 'UPDATE EMPLOYEE MANAGER', value: 7 }, 
            { name: 'DELETE EMPLOYEE', value: 8 }, 
            { name: 'DELETE DEPARTMENT', value: 9 },
            { name: 'DELETE ROLE', value: 10 },   
            { name: 'EXIT', value: 11 }
        ]
    }],
    employee: [
        {
            type: 'input',
            name: 'fN',
            message: 'Enter his/her first name',
            validate: Validate.name
        },
        {
            type: 'input',
            name: 'lN',
            message: 'Enter his/her last name',
            validate: Validate.name
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
            validate: Validate.name
        },

        {
            type: 'input',
            name: 'salary',
            message: 'Enter the yearly salary',
            validate: Validate.num
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
            validate: Validate.name
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
    ],
    updateEmployeeManager: [
        {
            type: 'number',
            name: 'eID',
            message: 'Enter employee\'s id'
        },
        {
            type: 'rawlist',
            name: 'mID',
            message: 'ASSIGN NEW Manager',
            choices: []
        }
    ],
    deleteDepartment: [
        {
            type: 'number',
            name: 'dID',
            message: 'Enter department\'s id'
        }
    ],
    deleteRole: [
        {
            type: 'number',
            name: 'rID',
            message: 'Enter role\'s id'
        }
    ],
    deleteEmployee: [
        {
            type: 'number',
            name: 'eID',
            message: 'Enter employee\'s id'
        }
    ]

};

module.exports = questions;