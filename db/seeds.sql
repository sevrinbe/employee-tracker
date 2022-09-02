INSERT INTO departments (name)
VALUES  ("Legal"),
        ("Sales"),
        ("IT"),
        ("Finance");

INSERT INTO roles (title, salary, department_id)
VALUES  ("Sales Lead", 120000, 2),
        ("Lead Software Engineer", 180000, 3),
        ("Software Engineer", 80000, 3),
        ("Accounting Manager", 170000, 4),
        ("Accoutant", 100000, 4);

INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUES  ("Steven", "Johnson", NULL, 1),
        ("John", "Smith", NULL, 2),
        ("Sarah", "Silverstin", 2, 5),
        ("Bill", "Withers", 1, 3); 