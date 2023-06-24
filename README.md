# 12employeetracker

## Project Overview
As a business owner, the ability to view and manage departments, roles, and employees within your company is essential to organization and planning. This command-line application provides a streamlined user interface to assist with these tasks.

## Acceptance Criteria
* This is a command-line application that accepts user input.
* Upon starting the application, the user is presented with options to:
    * View all departments
    * View all roles
    * View all employees
    * Add a department
    * Add a role
    * Add an employee
    * Update an employee role

* When the "view all departments" option is chosen, the application presents a formatted table showing department names and department ids.

* When the "view all roles" option is chosen, the application presents the job title, role id, the department that the role belongs to, and the salary for that role.

* When the "view all employees" option is chosen, the application presents a formatted table showing employee data, including:
    * Employee ids
    * First names
    * Last names
    * Job titles
    * Departments
    * Salaries
    * Managers that the employees report to

* When the "add a department" option is chosen, the application prompts the user to enter the name of the department. This new department is then added to the database.

* When the "add a role" option is chosen, the application prompts the user to enter the name, salary, and department for the role. This new role is then added to the database.

* When the "add an employee" option is chosen, the application prompts the user to enter the employee’s first name, last name, role, and manager. This new employee is then added to the database.

* When the "update an employee role" option is chosen, the application prompts the user to select an employee to update and their new role. This information is then updated in the database.

## Installation
1. Clone the repository to your local machine.
2. Run `npm install` to install all dependencies.
3. Run `node app.js` to start the application.

## Usage
Use arrow keys to navigate between different options and enter key to select. Input required details when prompted.

## Contributing
Open for any contributions. Please fork the project and submit a pull request with your changes.
