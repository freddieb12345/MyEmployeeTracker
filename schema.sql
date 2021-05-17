DROP DATABASE IF EXISTS employees_db; --Checks if a database with this name already exists and deletes it

CREATE DATABASE employees_db; --Creates database

USE employees_db;

--Create tables:
--Department;
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT, --Creates ID's for each created department and automatically increments them for every new department (i.e. 1,2,3,4...)
    name VARCHAR(50) NOT NULL,  --Creates a variable for the department name that can only be a maximum of 50 characters long
    PRIMARY KEY (id)
);

