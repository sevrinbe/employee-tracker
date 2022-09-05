require('dotenv').config()
require('console.table');
const mysql = require("mysql2/promise");
const chalk = require("chalk");
const connect = require('./config/dbConfig');
const inquirer = require("inquirer");
const dbConfig = require("./config/dbConfig");
const { up } = require('inquirer/lib/utils/readline');
var dbConnection;
let currentDepartments = [];
let currentDepartmentsId = [];
let currentRoles = [];
let currentRolesId = [];
let currentEmployees = [];
let currentEmployeesId = [];


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
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add a Department",
        "Add Role",
        "Add Employee",
        "Update Employee Role",
        "End"]
    })
    .then(function ({ task }) {
      switch (task) {
        case "View All Departments":
          viewAllDepartments();
          break;

        case "View All Roles":
          viewAllRoles();
          break;

        case "View All Employees":
          viewEmployees();
          break;

        case "Add a Department":
          addADepartment();
          break;
          
        case "Add Role":
          addRole();
          break;
          
        case "Add Employee":
          addEmployee();
          break;
          
        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "End":
          dbConnection.end();
          break;
      }
    });
};

async function getEmployees () {
  let query = `SELECT CONCAT(first_name, ' ', last_name) as Name,
              employees.employee_id AS employee_id
              FROM employees;`;

  await dbConnection.query(query).then((err) => {
    try {
      if (err) throw err;
    } catch (listedEmployees) {
      console.table(listedEmployees[0]);
      for(i = 0; i < listedEmployees[0].length; i++) {
        currentEmployees.push(listedEmployees[0][i].Name);
        currentEmployeesId.push(listedEmployees[0][i].employee_id);
      }
    }
  }); 
}

async function viewRolesQuery() {
  let query = `SELECT roles.title AS Roles,
                      roles.position_id AS "Position_ID"
              FROM roles;`;
  
  await dbConnection.query(query).then((err, res) => {
    try {
      if (err) throw err;
    } catch (res) {
      console.log("\n");
      console.table(res[0]);
      for(i = 0; i < res[0].length; i++) {
        currentRoles.push(res[0][i].Roles);
        currentRolesId.push(res[0][i].Position_ID);
      }
    }
    console.log("All Roles Viewed!\n")
});
};


function mostCurrentDepartments() {
  let query = `
  SELECT  departments.name AS Departments,
  departments.id as Department_ID
  FROM departments; `;
  
  dbConnection.query(query).then((err) => {
    try {
      if (err) throw err;
    } catch (viewDepartments) {
      console.table(viewDepartments[0]);
      for(i = 0; i < viewDepartments[0].length; i++) {
        currentDepartments.push(viewDepartments[0][i].Departments);
        currentDepartmentsId.push(viewDepartments[0][i].Department_ID);

      }
    }
  }); 
};

function viewAllDepartments () {
  console.log("\n")
  console.info(chalk.blue("=".repeat(30)));
  console.log("Viewing Department(s)");
  console.info(chalk.blue("=".repeat(30)));
  console.log("\n")
 
  let query = `
  SELECT  departments.name AS Departments,
  departments.id as 'Department ID'
  FROM departments; `;
  
  dbConnection.query(query).then((err) => {
    try {
      if (err) throw err;
    } catch (viewDepartments) {
      console.table(viewDepartments[0]);
    }
    console.log("Departments Viewed!\n")
    firstPrompt();
  }); 
};

async function viewAllRoles () {
  console.log("\n")
  console.info(chalk.blue("=".repeat(30)));
  console.log("Viewing all roles.");
  console.info(chalk.blue("=".repeat(30)));
  console.log("\n")
  
  await viewRolesQuery();
  firstPrompt(); 
};


function viewEmployees() {
  console.log("\n")
  console.info(chalk.blue("=".repeat(30)));
  console.log("Viewing employees");
  console.info(chalk.blue("=".repeat(30)));
  console.log("\n")
  
  let query =
    `SELECT employee_id AS "Employee ID",
      first_name AS "First Name",
      last_name AS "Last Name",
      roles.title as Role,
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

function addADepartment() {
  console.log("\n")
  console.info(chalk.blue("=".repeat(30)));
  console.log("Adding a Department");
  console.info(chalk.blue("=".repeat(30)));
  console.log("\n")

  let query = `SELECT departments.name AS Departments,
  departments.id as 'Deparment ID'
  FROM departments;`;

  dbConnection.query(query).then((err) => {
    try {
      if (err) throw err;
    } catch (departments) {
      console.log("\n")
      console.table(departments[0]);
      inquirer
      .prompt({
        type: "input",
        message: "What is the name of the department you would like to add?",
        name: "nameOfDepartment",
      })
      .then(function ({nameOfDepartment}) {
        query = `INSERT INTO departments (name)
        VALUES ('${nameOfDepartment}');`;
    
        dbConnection.query(query).then((err) => {
          try {
            if (err) throw err;
          } catch (departments) {
            viewAllDepartments();
          }
        })
    })
    }
  });
};

function addRole() {
  console.info(chalk.blue("=".repeat(30)));
  mostCurrentDepartments();
  let query = `SELECT roles.title AS Roles
  FROM roles;`;
  
  dbConnection.query(query).then((err) => {
    try {
      if (err) throw err;
    } catch (roles) {
      console.table(roles[0]);
      inquirer
      .prompt([{
        type: "input",
        message: "What role would you like to add?",
        name: "roleTitle",
      },
      {
        type: "input",
        message: "What salary would you like for this role?",
        name: "roleSalary",
      },
      {
        type: "list",
        message: "What department is this role in?",
        name: "roleDepartmentId",
        choices: currentDepartments,
      }])
      .then(function ({roleTitle, roleSalary, roleDepartmentId}) {
        console.log(roleTitle, roleSalary, roleDepartmentId);

        query = `INSERT INTO roles (title,salary,department_id) VALUES ("${roleTitle}","${roleSalary}","${currentDepartmentsId[currentDepartments.indexOf(roleDepartmentId)]}");`;

        dbConnection.query(query).then((err) => {
          try {
            if(err) throw err;
          } catch (newListOfRoles) {
            viewAllRoles();
          }
        })
      })
    }
  })



}

async function addEmployee() {
  console.log("\n")
  console.info(chalk.blue("=".repeat(30)));
  console.log("Adding an employee.");
  console.info(chalk.blue("=".repeat(30)));
  console.log("\n")

  await viewRolesQuery();
  await getEmployees();

  let newArray = [...currentEmployees];
  newArray.push("No Manager");

  await inquirer
  .prompt([{
    type: "input",
    message: "What is the first name?",
    name: "firstName",
  },
  {
    type: "input",
    message: "What is the last name?",
    name: "lastName",
  },
  {
    type: "list",
    message: "What role is this employee?",
    name: "employeeRole",
    choices: currentRoles,
  },
  {
    type: "list",
    message: "Who is their manager?",
    name: "employeeManager",
    choices: newArray,
  }])
  .then(async function ({firstName, lastName, employeeRole, employeeManager}) {
    let managerId = '';
    if(employeeManager != "No Manager") {
      managerId = currentEmployeesId[currentEmployees.indexOf(employeeManager)];
    };

    let query = `INSERT INTO employees (first_name, last_name, role_id)
               VALUES ("${firstName}", "${lastName}", "${currentRolesId[currentRoles.indexOf(employeeRole)]}");`

    if (managerId != '') {
      query = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
               VALUES ("${firstName}", "${lastName}", "${currentRolesId[currentRoles.indexOf(employeeRole)]}", "${managerId}");`
    }
    
  await dbConnection.query(query).then((err) => {
    try {
      if (err) throw err;
    } catch (response) {
      viewEmployees();
      console.log("Success!");
    }
  })
})
}

function updateEmployeeRole() {
  console.log("\n")
  console.info(chalk.blue("=".repeat(30)));
  console.log("Updating an employee's role.");
  console.info(chalk.blue("=".repeat(30)));
  console.log("\n")

  let query = `SELECT employee_id AS "Employee_ID",
  CONCAT(first_name, " ", last_name) AS Name,
  roles.title as Role
FROM employees
INNER JOIN roles
ON role_id = roles.position_id;`;

let listedEmployees = [];

dbConnection.query(query).then((err) => {
  try {
    if (err) throw err;
  } catch (selectEmployeeFromList) {
    console.table(selectEmployeeFromList[0]);
    
    

    for(i = 0; i < selectEmployeeFromList[0].length; i++) {
      listedEmployees.push(selectEmployeeFromList[0][i].Name);
    }
    
    listedEmployees.push("Cancel");

    inquirer
    .prompt({
      type: "list",
      name: "option",
      message: "Select an employee you would like to update.",
      choices: listedEmployees,
    })
    .then(function ({option}) {
      switch (option) {
        case "Cancel":
          console.log("\n")
          console.info(chalk.blue("=".repeat(30)));
          console.log("\n Cancelled\n ");
          console.info(chalk.blue("=".repeat(30)));
          console.log("\n");
          firstPrompt();
          break;
        default: 
        for(i = 0; i < selectEmployeeFromList[0].length; i++) {
          if(option == selectEmployeeFromList[0][i].Name) 
          {
            changeEmployeeRole(selectEmployeeFromList[0][i])}
        };
      }
    })
  }
})
};

function changeEmployeeRole (employee) {
  console.log("\n")
  console.info(chalk.blue("=".repeat(30)));
  console.log(`${employee.Name}'s current role is ${employee.Role}.\n\nWhat role would you like to assign ${employee.Name}?`);  console.info(chalk.blue("=".repeat(30)));
  console.log("\n")

  
  let query = `SELECT roles.title AS Roles,
                      roles.position_id AS role_id
  FROM roles;`;
  
  let newArray = [];
  
  dbConnection.query(query).then((err) => {
    try {
      if (err) throw err;
    } catch (res) {
      newArray = [...res[0]];
    }
    let options = [];
    
    
    for(i = 0; i < newArray.length; i++) {
      options.push(newArray[i].Roles);
    }
    options.push("Cancel");
    
     inquirer
    .prompt({
      type: "list",
      name: "selectedRole",
      message: "Please select a role for the employee.",
      choices: options,
    })
    .then(function ({selectedRole}) {
      if (selectedRole == "Cancel") {
        firstPrompt();
      }

      let roleIdFromSelectedRole = newArray[options.indexOf(selectedRole)].role_id;

      let query = `UPDATE employees SET role_id = ${roleIdFromSelectedRole}
      WHERE employees.employee_id = ${employee.Employee_ID};`

      dbConnection.query(query).then((err) => {
        try {
          if(err) throw err;
        } catch (updatedEmployee) {
          viewEmployees();          
        }
      })
    })
}); 

};

// function removeEmployee() {
//   console.log("\n")
//   console.info(chalk.blue("=".repeat(30)));
//   console.log("Removing an employee.");
//   console.info(chalk.blue("=".repeat(30)));
//   console.log("\n")

//   getEmployees();

//   let query = `UPDATE employees SET manager_id = NULL WHERE manager_id = ${currentEmployeesId};
//   DELETE employees WHERE employee_id = ${currentEmployeesId};`
  
//   dbConnection.query(query).then((err) => {
//     try {
//       if (err) throw err;
//     } catch (response) {
//       console.table(response)
//     }
//   })
// }
