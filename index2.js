require('dotenv').config()
const mysql = require("mysql2/promise");
const chalk = require("chalk");
const inquirer = require("inquirer");
const dbConfig = require("./config/dbConfig");
const BaseEntity = require("./models/BaseEntity");
const Department = require("./models/Department");
let dbConnection;
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_SCHEMA } = process.env;
let connection;

async function connect() {
    try {
        let connection = await mysql.createConnection({
            host: DB_HOST,
            port: DB_PORT,
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_SCHEMA
        });
        return connection;
    } catch (err) {
        console.error(chalk.red(err));
        throw new Error("Unable to connect to database");
    }
}

console.log(connection);

async function main() {
    console.info(chalk.blue("=".repeat(30)));
    console.info(chalk.blue("Connecting to database..."));
    console.info(chalk.blue("=".repeat(30)));
    dbConnection = await dbConfig();
    console.info(chalk.blue("Connected to database!"));
    console.info(chalk.blue("=".repeat(30)));
    firstPrompt();
};

console.log(dbConfig);

main();

async function firstPrompt() {
    await inquirer
    .prompt({
      type: "list",
      name: "task",
      message: "Would you like to do?",
      choices: [
        "View Employees",
        "View Employees by Department",
        "Add Employee",
        "Remove Employees",
        "Update Employee Role",
        "Add Role",
        "End"]
    })
    .then(function ({ task }) {
      switch (task) {
        case "View Employees":
          viewEmployees();
          break;

        case "View Employees by Department":
          viewEmployeesByDepartment();
          break;
      
        case "Add Employee":
          addEmployees();
          break;

        case "Remove Employees":
          removeEmployees();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "Add Role":
          addRole();
          break;

        case "End":
          dbConnection.end();
          break;
      }
    });
};

function viewEmployees() {
    console.log("Viewing employees\n");
  
    var query =
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

  console.log(connection);


  };




