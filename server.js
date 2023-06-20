const db = require('./connection');
require('console.table');
const inquirer = require('inquirer');
const utils = require('util');
db.query = utils.promisify(db.query);

const mainMenu = [
{
    name: 'mainMenu',
    type: 'list', 
    message: 'What would you like to do?',
    choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Delete a department',
        'Delete a role',
        'Delete an employee',
        'Quit'
    ],
}    
];

function init() {
    inquirer
        .prompt(mainMenu)
        .then(response => {
            if (response.mainMenu === 'View all departments') {
                viewDepartments();
            } else if (response.mainMenu === 'View all roles') {
                viewRoles();
            } else if (response.mainMenu === 'View all employees') {
                viewEmployees();
            } else if (response.mainMenu === 'Add a department') {
                createDepartment();
            } else if (response.mainMenu === 'Add a role') {
                createRole();
            } else if (response.mainMenu === 'Add an employee') {
                createEmployee();
            } else if (response.mainMenu === 'Update an employee role') {
                updateRole();
            } else if (response.mainMenu === 'Delete a department') {
                deleteDepartment();
            } else if (response.mainMenu === 'Delete a role') {
                deleteRole();
            }
        })
}