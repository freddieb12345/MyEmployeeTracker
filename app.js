//Import required modules
const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const { formatWithOptions } = require('node:util');

//Create the connection to the mysql database
const connection = mysql.createConnection
({ 
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '!Peebles12',
    database: 'employees_db',  
});

//If there is an error, throw error, otherwise, run the menu function
connection.connect(function(err){
    if(err) throw err;
    menu();
});

//Create funciton that asks the user to chose from a series of options
function menu() {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'Welcome to your employee database, please chose from one of the options below',
            choices:
            [
                'View Employees',
                'View Departments',
                'View Roles',
                'Add an Employee',
                'Add a Department',
                'Add a Role',
                'Change Employees Role',
                'Delete an Employee',
                'EXIT database'
            ]
        }).then(function(answer)
        {
            switch(answer.action){
                case 'View Employees':
                    viewEmployees();
                    break;
            }
        })
};