//Import required modules
const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const { exit } = require('node:process');
const { connect } = require('node:http2');


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
                'Remove Employee',
                'Update Employees Role',
                'Update Employees Manager',
                'EXIT database'
            ]
        //Creating switch cases that determine the next function depending on the selection of the above choices from the  user
        }).then(function(answer)
        {
            switch(answer.action){
                case 'View Employees':
                    viewEmployees();
                    break;
                case 'View Departments':
                    viewDepartments();
                    break;
                case 'View Roles':
                    viewRoles();
                    break;
                case 'Add an Employee':
                    addEmployee();
                    break;
                case 'Add a Department':
                    addDepartment();
                    break;
                case 'Add a Role':
                    addRole();
                    break;
                case 'Update Employees Role':
                    updateRole();
                    break;
                case 'Update Employees Manager':
                    updateManager();
                    break;
                case 'EXIT database':
                    exitApp();
                    break;
                default:
                    break;
            }
        })
};

//View employees function
function viewEmployees() {
    var query = 'SELECT * FROM employee'; //Selects all the items from the employee table
    connection.query(query, function(err, res) {
        if (err) throw err; //If error, throw error
        console.log(res.length + 'Employees found'); //Logs the number of employees found
        console.log('Employees:', res); //Logs the response from the query, i.e the list of employees
        menu(); //Brings the user back to the menu
    })
};

function viewDepartments() {
    var query = 'SELECT * FROM department'; //Selects all the items from the department table
    connection.query(query, function(err, res) {
        if (err) throw err; //If error, throw error
        console.log(res.length + 'Departments found'); //Logs the number of departments found
        console.log('Departments', res); //Logs the response from the query, i.e the list of departments
        menu(); //Brings the user back to the menu
    })
};

function viewRoles() {
    var query = 'SELECT * FROM role'; //Selects all the items from the role table
    connection.query(query, function(err, res) {
        if (err) throw err; //If error, throw error
        console.log(res.length + 'Roles found'); //Logs the number of roles found
        console.log('Roles', res); //Logs the response from the query, i.e the list of roles
        menu(); //Brings the user back to the menu
    })
};