SELECT employee_id AS "Employee ID",
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
ORDER BY A.manager_id;



/* 
UPDATE employees SET manager_id = NULL WHERE manager_id = ---VARIABLE FOR EMPLOYEE ID---;
DELETE employees WHERE employee_id = ---VARIABLE FOR EMPLOYEE ID---;
*/


SELECT roles.title AS roles
FROM roles; 

SELECT departments.name AS departments
FROM departments; 

/* INSERT INTO roles (position_id) */