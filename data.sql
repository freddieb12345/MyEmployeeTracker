USE employees_db --import the employees database

INSERT INTO department (name) --Creates default values within the department table for the user to use
VALUES
('Finance'),
('Legal'),
('Audit'),
('Tech'),
('HR'),
('Security'),


INSERT INTO role (title, salary, department_id) --Creates default values for the roles table, assigning a standard salary and department_id to each role
VALUES
('Accountant', 50000, 1),
('Lawyer', 100000, 2),
('Team Manager', 70000, 3),
('Web Developer', 40000, 4),
('Intern', 18000, 5),

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Freddie', 'Brewin', 1, 123)
('Dan', 'James', 2, 456)

