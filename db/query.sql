SELECT employees.employee_id AS employee_id,
    employees.first_name AS first_name,
    employees.last_name AS last_name,
    roles.title as title,
    roles.salary as salary,
    departments.name as department,
    employees.manager_id + ' ' + employees.first_name + ' ' + employees.last_name AS manager
FROM employees  
INNER JOIN roles
ON employees.role_id = roles.position_id
INNER JOIN departments 
ON roles.department_id = departments.id
ORDER BY employees.manager_id;


/* 
UPDATE employees SET manager_id = NULL WHERE manager_id = ---VARIABLE FOR EMPLOYEE ID---;
DELETE employees WHERE employee_id = ---VARIABLE FOR EMPLOYEE ID---;
*/


SELECT roles.title AS roles
FROM roles; 

SELECT departments.name AS departments
FROM departments; 

/* INSERT INTO roles (position_id) */