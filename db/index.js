import mysql from 'mysql2';
import inquirer from 'inquirer';
import connection from './connection.js';

const db = connection;

console.log(`Connected to the employeeTracker_db database.`);

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
            if (err) throw err;
            console.table(result);
            promptManager();
        });
    }
    if (answers.menu === "View all roles") {
        db.query(`SELECT * FROM role`, (err, result) => {
            if (err) throw err;
            console.table(result);
            promptManager();
        });
    }
    if (answers.menu === "View all employees") {
        db.query(`SELECT * FROM employee`, (err, result) => {
            if (err) throw err;
            console.table(result);
            promptManager();
        });
    }
    if (answers.menu === "Add department") {
        const departmentAnswer = await inquirer.prompt([
            {
                type: "input",
                name: "newDepartment",
                message: "What is the new department?"
            }
        ]);
        const newDepartment = departmentAnswer.newDepartment;
        db.query(`INSERT INTO department (department_name) VALUES (?)`, [newDepartment], (err, result) => {
            if (err) throw err;
            console.log("Department added successfully!");
            promptManager();
        });
    }

    if (answers.menu === "Add role") {
        const roleAnswers = await inquirer.prompt([
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
        ]);
        const newRole = roleAnswers.newRole;
        const newSalary = roleAnswers.newSalary;
        const newDepartmentId = roleAnswers.newDepartID;
        db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [newRole, newSalary, newDepartmentId], (err, result) => {
            if (err) throw err;
            console.log("Role added successfully!");
            promptManager();
        });
    }

    if (answers.menu === "Add employee") {
        const employeeAnswers = await inquirer.prompt([
            {
                type: "input",
                name: "firstName",
                message: "What is the new employee's first name?"
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the new employee's last name?"
            },
            {
                type: "input",
                name: "newRole",
                message: "What is the new employee's role ID?"
            },
            {
                type: "input",
                name: "managerID",
                message: "What is the new employee's manager ID?"
            }
        ]);
        const firstName = employeeAnswers.firstName;
        const lastName = employeeAnswers.lastName;
        const roleId = employeeAnswers.newRole;
        const managerId = employeeAnswers.managerID;
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [firstName, lastName, roleId, managerId], (err, result) => {
            if (err) throw err;
            console.log("Employee added successfully!");
            promptManager();
        });
    }

    if (answers.menu === "Update an employee's role") {
        const updateAnswers = await inquirer.prompt([
            {
                type: "input",
                name: "updateEmployee",
                message: "What is the employee's ID?"
            },
            {
                type: "input",
                name: "updateRole",
                message: "What is the new role ID?"
            }
        ]);
        const employeeId = updateAnswers.updateEmployee;
        const newRoleId = updateAnswers.updateRole;
        db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [newRoleId, employeeId], (err, result) => {
            if (err) throw err;
            console.log("Employee role updated successfully!");
            promptManager();
        });
    }
}

db.connect((err) => {
    if (err) throw err;
    promptManager();
});
