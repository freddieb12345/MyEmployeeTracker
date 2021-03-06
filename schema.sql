DROP DATABASE IF EXISTS employees_db; -- Checks if a database with this name already exists and deletes it

CREATE DATABASE employees_db; -- Creates database

USE employees_db;

-- Create tables:
-- Department:
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT, -- Creates ID's for each created department and automatically increments them for every new department (i.e. 1,2,3,4...)
    name VARCHAR(30) NOT NULL,  -- Creates a variable for the department name that can only be a maximum of 50 characters long and can't be NULL
    PRIMARY KEY (id)
);

-- Role:
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL, -- Allows the salary variable to use decimals
    department_id INT NOT NULL, -- Passes in the department_id defined above in the department table
    PRIMARY KEY (id)
);

-- Create table for employees
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name  VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
    PRIMARY KEY(id)
);
