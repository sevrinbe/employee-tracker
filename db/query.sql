SELECT employees.id AS employee_id,
    employees.first_name AS first_name,
    employees.last_name AS last_name,
    employees.manager_id AS manager,
    roles.title as title,
    roles.salary as salary,
    departments.name as department
FROM employees
INNER JOIN roles
ON employees.id = roles.id
INNER JOIN departments 
ON employees.role_id = departments.id
ORDER BY employees.manager_id;


