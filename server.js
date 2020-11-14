const EMS = require('./lib/employee_management-system');
const questionList = require('./lib/questions');
const connection = require('./config/connection.js');

let ems = new EMS(questionList, connection);
ems.launch();