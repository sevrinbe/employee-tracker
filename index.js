require('dotenv').config()
require('console.table');
const mysql = require("mysql2/promise");
const chalk = require("chalk");
const connect = require('./config/dbConfig');
const inquirer = require("inquirer");
const dbConfig = require("./config/dbConfig");
const BaseEntity = require("./models/BaseEntity");
const Department = require("./models/Department");

var dbConnection;


async function main() {
    console.info(chalk.blue("=".repeat(30)));
    console.info(chalk.blue("Connecting to database..."));
    console.info(chalk.blue("=".repeat(30)));
    dbConnection = await dbConfig();
    console.info(chalk.blue("Connected to database!"));
    console.info(chalk.blue("=".repeat(30)));
    firstPrompt();
};

main();

function firstPrompt() {
    inquirer
    .prompt({
      type: "list",
      name: "task",
      message: "Would you like to do?",
      choices: [
        "View All Deparments",
        "View All Roles",
        "View All Employees",
        "Add a Department",
        "Add Role",
        "Add Employee",
        "Update Employee Role",
        "Remove Employees",
        "End"]
    })
    .then(function ({ task }) {
      switch (task) {
        case "View All Deparments":
          viewAllDeparments();
          break;

        case "View All Roles":
          viewAllRoles();
          break;

        case "View All Employees":
          viewEmployees();
          break;

        case "Add a Department":
          addADeparment();
          break;
          
        case "Add Role":
          addRole();
          break;
          
        case "Add Employee":
          addEmployees();
          break;
          
        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "Remove Employees":
          removeEmployees();
          break;

        case "End":
          dbConnection.end();
          break;
      }
    });
};



function viewEmployees() {
  console.log("Viewing employees\n");
  
  let query =
    `SELECT employee_id AS "Employee ID",
      first_name AS "First Name",
      last_name AS "Last Name",
      roles.title as Title,
      roles.salary as Salary,
      departments.name as Department,
      (SELECT (SELECT CONCAT(first_name, ' ', last_name)) 
      FROM employees
      WHERE A.manager_id = employee_id) AS Manager
      FROM employees AS A
      INNER JOIN roles
      ON A.role_id = roles.position_id
      INNER JOIN departments 
      ON roles.department_id = departments.id
    ORDER BY A.manager_id;`;

  dbConnection.query(query).then((err) => {
    try { 
      if (err) throw err; 
    } catch (viewableEmployees) {
    console.table(viewableEmployees[0]);
  }
  console.log("Employees viewed!\n");
  firstPrompt();
  });
};

function viewAllDeparments () {
  console.log("Viewing employees by department...");

  let query = `
  SELECT  departments.name AS Departments,
          departments.id as 'Deparment ID'
  FROM departments; `;

  dbConnection.query(query).then((err) => {
    try {
      if (err) throw err;
    } catch (viewingEmployeesByDepartment) {
      console.table(viewingEmployeesByDepartment[0]);
    }
    console.log("Departments Viewed!\n")
    firstPrompt();
  }); 
};








/** GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: 










WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database */ 