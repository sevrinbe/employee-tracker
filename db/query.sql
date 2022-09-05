/* SELECT employee_id AS Employee_ID,
    first_name AS First_Name,
    last_name AS Last_Name,
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
ORDER BY A.manager_id; */

-- VIEW EMPLOYEES AND THEN SELECT THAT EMPLOYEE TO UPDATE THEIR ROLE --

/* SELECT employee_id AS Employee_ID,
    CONCAT(first_name, " ", last_name) AS Name,
    roles.title as Role
FROM employees
INNER JOIN roles
ON role_id = roles.position_id; */


UPDATE employees SET manager_id = NULL WHERE manager_id = ---VARIABLE FOR EMPLOYEE ID---;
DELETE employees WHERE employee_id = ---VARIABLE FOR EMPLOYEE ID---; */



UPDATE employees SET role_id = ${selectedRole}
WHERE employees.first_name = ${employee.split[0]}; */

/* SELECT roles.title AS roles
FROM roles; 

SELECT  departments.name AS Departments,
        departments.id as 'Deparment ID'
FROM departments;  */

/* INSERT INTO roles (position_id) */


INSERT INTO roles (title, salary)
    VALUES (${roleTitle}, ${roleSalary}, ${roleDepartmentId});


SELECT * FROM roles;

INSERT INTO roles (title, salary, department_id)
    VALUES ("Marketing_manager", 140000, );

SELECT * FROM roles;

SELECT * FROM roles;
