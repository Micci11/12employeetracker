import mysql from 'mysql2';
import inquirer from "inquirer";

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Chiante1!',
        database: 'employeeTracker_db',
    },
    console.log(`Connected to the employeeTracker_db database.`)
);

async function promptManager() {
    const answers = await inquirer.prompt([
    {
        type: "list",
        name: "menu",
        message: "What would you like to do?",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add department",
            "Add role",
            "Add employee",
            "Update an employees' role"
        ]
    }    
]);

if (answers.menu === "View all departments") {
    db.query(`SELECT * FROM department`, (err, result) => {
        if (err) throw err
        console.table (result)
        promptManager();
    });
}
if (answers.menu === "View all roles") {
    db.query(`SELECT * FROM role`, (err, result) => {
        if (err) throw err
        console.table (result)
        promptManager();
    });
}
if (answers.menu === "View all employees") {
    db.query(`SELECT * FROM employee`, (err, result) => {
        if (err) throw err
        console.table (result)
        promptManager();
    });
}
if (answers.menu === "Add department") {
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "newDepartment",
            message: "What is the new department?"
        }
    ])
    db.query(`INSERT INTO department (department_name) VALUES (?)`, [answers.newDepartment], (err, result) => {
        if (err) throw err
        console.table (result)
        promptManager();
    });
}

if (answers.menu === "Add role") {
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "newRole",
            message: "What is the new role?"
        },
        {
            type: "input",
            name: "newSalary",
            message: "What is the salary?"
        },
        {
            type: "input",
            name: "newDepartID",
            message: "What is the department ID?"
        }
    ])
    db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [answers.newRole, answers.newSalary, answers.newDepartID], (err, result) => {
        if (err) throw err
        console.table (result)
        promptManager();
    });
}

if (answers.menu === "Add employee") {
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the new employees' first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the new employees' last name?"
        },
        {
            type: "input",
            name: "newRole",
            message: "What is the new employees' role ID?"
        },
        {
            type: "input",
            name: "managerID",
            message: "What is the new employees' manager ID?"
        }
    ])
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answers.firstName, answers.lastName, answers.newRole, answers.managerID], (err, result) => {
        if (err) throw err
        console.table (result)
        promptManager();
    });
}

if (answers.menu === "Update an employees' role") {
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "updateEmployee",
            message: "What is the employees' ID?"
        },
        {
            type: "input",
            name: "updateRole",
            message: "What is the new role ID?"
        }
    ])
    db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [answers.updateRole, answers.updateEmployee], (err,result) => {
        if (err) throw err
        console.table (result)
        promptManager();
    })    
}
}

db.connect(err => {
    if (err) throw err
    promptManager();
})
