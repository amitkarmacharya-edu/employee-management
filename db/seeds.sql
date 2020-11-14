-- Insert into Department table
INSERT INTO employee_management_db.department(name) VALUES('Management');
INSERT INTO employee_management_db.department(name) VALUES('Human Resource');
INSERT INTO employee_management_db.department(name) VALUES('IT');
INSERT INTO employee_management_db.department(name) VALUES('Security');
INSERT INTO employee_management_db.department(name) VALUES('Operations');
INSERT INTO employee_management_db.department(name) VALUES('Finance');

-- Insert into Roles Table
INSERT INTO employee_management_db.`role`(title, salary, department_id) VALUES('Manager', 70000, 1);
INSERT INTO employee_management_db.`role`(title, salary, department_id) VALUES('Junior Web Developer', 80000, 3);
INSERT INTO employee_management_db.`role`(title, salary, department_id) VALUES('Senior Web Developer', 140000, 3);
INSERT INTO employee_management_db.`role`(title, salary, department_id) VALUES('Mid-Level Web Developer', 100000, 3);
INSERT INTO employee_management_db.`role`(title, salary, department_id) VALUES('Recruiter', 40000, 2);
INSERT INTO employee_management_db.`role`(title, salary, department_id) VALUES('Owner', 1000000, 1);

-- Insert into Employee Table
INSERT INTO employee_management_db.employee(first_name, last_name, role_id, manager_id) VALUES('John', 'Wick', 3, 1);
INSERT INTO employee_management_db.employee(first_name, last_name, role_id, manager_id) VALUES('Amit', 'Karmacharya', 6, 0);

