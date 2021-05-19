//Import required modules
const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const { query } = require('express');


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
        console.log(res.length + ' Employees found'); //Logs the number of employees found
        console.table('Employees:', res); //Logs the response from the query, i.e the list of employees as a table
        menu(); //Brings the user back to the menu
    })
};

//View Departments function
function viewDepartments() {
    var query = 'SELECT * FROM department'; //Selects all the items from the department table
    connection.query(query, function(err, res) {
        if (err) throw err; //If error, throw error
        console.log(res.length + ' Departments found'); //Logs the number of departments found
        console.table('Departments', res); //Logs the response from the query, i.e the list of departments as a table
        menu(); //Brings the user back to the menu
    })
};

//View Roles function
function viewRoles() {
    var query = 'SELECT * FROM role'; //Selects all the items from the role table
    connection.query(query, function(err, res) {
        if (err) throw err; //If error, throw error
        console.log(res.length + ' Roles found'); //Logs the number of roles found
        console.table('Roles', res); //Logs the response from the query, i.e the list of roles as a table
        menu(); //Brings the user back to the menu
    })
};

//Add Employee function
function addEmployee() {
    connection.query('SELECT * FROM role', function (err, res) { //Selects all values from the role table
        if(err) throw err; 
        inquirer
            .prompt([
                {
                    name: 'first_name',
                    type: 'input',
                    message: "What is the new employee's first name?"
                },
                {
                    name: 'last_name',
                    type: 'input',
                    message: "What is the new employee's last name?"
                },
                {
                    name: 'manager_id',
                    type: 'input',
                    message: "What is the new employee's manger's ID?"
                },
                {
                    name: 'role',
                    type: 'list',
                    choices: function() {
                        var roles = []; //Create an array for the roles
                        for(let i = 0; i < res.length; i++) {
                            roles.push(res[i].title); //For every value within the response of the query, push the title to the roles array, thereby creating an array with all the current roles in it
                        }
                        return roles;
                    },
                    message: "What is the employee's role?"
                }
            ]).then(function (answer) {
                let role_id;
                for(let a = 0; a < res.length; a++) {
                    if(res[a].title == answer.role) { //Compares the response title to the users answer and if theyre the same, creates a variable role_id that is equal to the response id.
                        role_id = res[a].id;
                        console.log(role_id);
                    }
                }
                connection.query(
                    'INSERT INTO employee SET ?', //Adds the new employee into the employee table
                    {
                        first_name: answer.first_name, 
                        last_name: answer.last_name,
                        manager_id: answer.manager_id,
                        role_id: role_id
                    },
                    function (err){
                        if (err) throw err;
                        console.log('Your employee has been added!');
                        menu();
                    })
            })
    })
};

//Add department function
function addDepartment() {
    inquirer
        .prompt([
            {
                name: 'newDepartment',
                type: 'input',
                message: 'Input what department you would like to add to the database'
            }
        ])
        .then(function(answer) {
            connection.query( 
                'INSERT INTO department SET ?',
                {
                    name: answer.newDepartment //Inserts the users answer into the department table
                });
            var query = 'SELECT * FROM department'; //Selects all items in the department table
            connection.query(query,function(err, res){
                if(err) throw err; //If error throw error
                console.log('The new department has been added to the database');
                console.table(res); //Logs the response from the query, i.e the list of departments as a table
                menu();
            })
        })
};

function addRole() {
    connection.query('SELECT * FROM department', function(err, res){ //Selects all data from the department table
        if(err) throw err; 
        inquirer
            .prompt([
                {
                    name:'newRole',
                    type:'input',
                    message:'Input the new role you would like to add to the databse'
                },
                {
                    name: 'salary',
                    type: 'input',
                    message: 'Input the salary of this new role (As an number)'
                },
                {
                    name: 'Department',
                    type: 'list',
                    message: 'What department is the role a part of?',
                    choices: function(){
                        var departmentArray = [];
                        for (let i = 0; i < res.length; i++) {
                            departmentArray.push(res[i].name);
                        } //Creates a department array and pushes all the names from the department table into it 
                        return departmentArray; //Returns the department array and shows it to the user as the choices for the above question
                    },
                }
            ]) .then(function(answer) {
                let department_id;
                for (let a =0; a < res.length; a++) { //Loops over the response from the query and checks if the users input matches any of the names withing the response query and then assigns the department_id to be the same as the response id
                    if (res[a].name == answer.Department) {
                        department_id = res[a].id;
                    }
                }
                connection.query( //Inserts the new role into the role table
                    'INSERT INTO role SET ?',
                    {
                        title: answer.newRole,
                        salary: answer.salary,
                        department_id: department_id
                    });
                    var query = 'SELECT * FROM role';
                    connection.query(query,function(err,res) {
                        if(err)throw err;
                        console.log('The new role has been added');
                        console.table('Roles:', res); //Logs the response from the query, i.e the list of roles as a table
                        menu();
                    })
            })
    })
};