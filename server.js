import inquirer from "inquirer";
import connection from './db/connection.js';
import "console.table";
import { promisify } from "util";

const db = connection;
db.query = promisify(db.query);

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
      'Quit'
    ],
  }
];

async function viewDepartments() {
  try {
    const departments = await db.query('SELECT * FROM department');
    console.table(departments);
  } catch (error) {
    console.log('Error retrieving departments:', error);
  }
  init();
}

async function viewRoles() {
  try {
    const roles = await db.query('SELECT * FROM role');
    console.table(roles);
  } catch (error) {
    console.log('Error retrieving roles:', error);
  }
  init();
}

async function viewEmployees() {
  try {
    const query = `
    SELECT 
      e.id,
      e.first_name,
      e.last_name,
      r.title,
      d.department_name AS department,
      r.salary,
      CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM 
      employee AS e
      LEFT JOIN role AS r ON e.role_id = r.id
      LEFT JOIN department AS d ON r.department_id = d.id
      LEFT JOIN employee AS m ON e.manager_id = m.id
  `;

    const employees = await db.query(query);
    console.table(employees);
    init();
  } catch (error) {
    console.error(error);
    init();
  }
}

async function createDepartment() {
  try {
    const department = await inquirer.prompt([
      {
        name: 'departmentName',
        type: 'input',
        message: 'Enter the name of the department:',
      },
    ]);

    // Insert the department into the database
    await db.query('INSERT INTO department (department_name) VALUES (?)', [department.departmentName]);

    console.log('Department created successfully!');
  } catch (error) {
    console.log('Error creating department:', error);
  }

  init();
}

async function createRole() {
  try {
    // Fetch the departments from the database to display as choices for the user
    const departments = await db.query('SELECT * FROM department');
    const departmentChoices = departments.map((department) => ({
      name: department.department_name,
      value: department.id,
    }));

    const role = await inquirer.prompt([
      {
        name: 'title',
        type: 'input',
        message: 'Enter the title of the role:',
      },
      {
        name: 'salary',
        type: 'number',
        message: 'Enter the salary for the role:',
      },
      {
        name: 'departmentId',
        type: 'list',
        message: 'Select the department for the role:',
        choices: departmentChoices,
      },
    ]);

    // Insert the role into the database
    await db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [
      role.title,
      role.salary,
      role.departmentId,
    ]);

    console.log('Role created successfully!');
  } catch (error) {
    console.log('Error creating role:', error);
  }

  init();
}

async function createEmployee() {
  try {
    // Fetch the roles from the database to display as choices for the user
    const roles = await db.query('SELECT * FROM role');
    const roleChoices = roles.map((role) => ({
      name: role.title,
      value: role.id,
    }));

    // Fetch the employees from the database to display as choices for the user
    const employees = await db.query('SELECT * FROM employee');
    const employeeChoices = employees.map((employee) => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    }));

    const employee = await inquirer.prompt([
      {
        name: 'firstName',
        type: 'input',
        message: 'Enter the first name of the employee:',
      },
      {
        name: 'lastName',
        type: 'input',
        message: 'Enter the last name of the employee:',
      },
      {
        name: 'roleId',
        type: 'list',
        message: 'Select the role for the employee:',
        choices: roleChoices,
      },
      {
        name: 'managerId',
        type: 'list',
        message: 'Select the manager for the employee:',
        choices: [{ name: 'None', value: null }, ...employeeChoices],
      },
    ]);

    // Insert the employee into the database
    await db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [
      employee.firstName,
      employee.lastName,
      employee.roleId,
      employee.managerId,
    ]);

    console.log('Employee created successfully!');
  } catch (error) {
    console.log('Error creating employee:', error);
  }

  init();
}

async function updateRole() {
  try {
    // Fetch the employees from the database to display as choices for the user
    const employees = await db.query('SELECT * FROM employee');
    const employeeChoices = employees.map((employee) => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    }));

    // Fetch the roles from the database to display as choices for the user
    const roles = await db.query('SELECT * FROM role');
    const roleChoices = roles.map((role) => ({
      name: role.title,
      value: role.id,
    }));

    const employeeRole = await inquirer.prompt([
      {
        name: 'employeeId',
        type: 'list',
        message: 'Select the employee to update:',
        choices: employeeChoices,
      },
      {
        name: 'roleId',
        type: 'list',
        message: 'Select the new role for the employee:',
        choices: roleChoices,
      },
    ]);

    // Update the employee's role in the database
    await db.query('UPDATE employee SET role_id = ? WHERE id = ?', [
      employeeRole.roleId,
      employeeRole.employeeId,
    ]);

    console.log('Employee role updated successfully!');
  } catch (error) {
    console.log('Error updating employee role:', error);
  }

  init();
}

async function deleteDepartment() {
  try {
    // Fetch the departments from the database to display as choices for the user
    const departments = await db.query('SELECT * FROM department');
    const departmentChoices = departments.map((department) => ({
      name: department.department_name,
      value: department.id,
    }));

    const departmentId = await inquirer.prompt([
      {
        name: 'departmentId',
        type: 'list',
        message: 'Select the department to delete:',
        choices: departmentChoices,
      },
    ]);

    // Delete the department from the database
    await db.query('DELETE FROM department WHERE id = ?', [departmentId.departmentId]);

    console.log('Department deleted successfully!');
  } catch (error) {
    console.log('Error deleting department:', error);
  }

  init();
}

async function deleteRole() {
  try {
    // Fetch the roles from the database to display as choices for the user
    const roles = await db.query('SELECT * FROM role');
    const roleChoices = roles.map((role) => ({
      name: role.title,
      value: role.id,
    }));

    const roleId = await inquirer.prompt([
      {
        name: 'roleId',
        type: 'list',
        message: 'Select the role to delete:',
        choices: roleChoices,
      },
    ]);

    // Delete the role from the database
    await db.query('DELETE FROM role WHERE id = ?', [roleId.roleId]);

    console.log('Role deleted successfully!');
  } catch (error) {
    console.log('Error deleting role:', error);
  }

  init();
}

async function init() {
  try {
    const response = await inquirer.prompt(mainMenu);
    const selectedOption = response.mainMenu;

    switch (selectedOption) {
      case 'View all departments':
        await viewDepartments();
        break;
      case 'View all roles':
        await viewRoles();
        break;
      case 'View all employees':
        await viewEmployees();
        break;
      case 'Add a department':
        await createDepartment();
        break;
      case 'Add a role':
        await createRole();
        break;
      case 'Add an employee':
        await createEmployee();
        break;
      case 'Update an employee role':
        await updateRole();
        break;
      case 'Delete a department':
        await deleteDepartment();
        break;
      case 'Delete a role':
        await deleteRole();
        break;
      case 'Quit':
        console.log('Goodbye!');
        process.exit();
    }
  } catch (error) {
    console.log('Error:', error);
  }
}

init();
