const EMS = require('./lib/employee_management-system');
const questionList = require('./lib/questions');

let ems = new EMS(questionList);
ems.launch();