INSERT INTO department (department_name)
VALUES ('Sales'),
       ('HR'),
       ('Engineering'),
       ('Management');

INSERT INTO role (title, salary, department_id)
VALUES ('Lead', 40000, 1),
       ('Manager', 45000, 4),
       ('Senior Developer', 70000, 3),
       ('Project Manager', 60000, 4),
       ('Director', 55000, 2);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Emily', 'Smith', 2, null),
        ('Jesse', 'Sway', 4, 1),
        ('Shay', 'Witt', 1, 1),
        ('Andrew', 'Miller', 3, 1),
        ('Beth', 'Gardner', 5, 1);



