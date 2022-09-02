INSERT INTO departments (id, name)
VALUES  (1, "Legal"),
        (2, "Sales"),
        (3, "Engineering"),
        (4, "Finance");


INSERT INTO roles (id, title, salary, department_id)
VALUES  (1, "Sales Lead", 120000, 2),
        (2, "Lead Software Engineer", 180000, 3),
        (3, "Software Engineer", 80000, 3),
        (5, "Accounting Manager", 170000, 4),
        (4, "Accoutant", 100000, 4);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES  (1, "Steven", "Johnson", 1, NULL),
        (3, "John", "Smith", 4, NULL),
        (4, "Sarah", "Silverstin", 4, 3),
        (2, "Bill", "Withers", 3, 1);