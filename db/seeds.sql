INSERT INTO departments (name) VALUES ('Sales');
INSERT INTO departments (name) VALUES ('Finance');
INSERT INTO departments (name) VALUES ('HR');
INSERT INTO departments (name) VALUES ('IT');

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (Nariyoshi, Miyagi, 1, NULL);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (Daniel, Larusso, 2, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (John, Kreese, 3, NULL);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (Johnny, Lawrence, 4, 3);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (Tommy, Gibson, 4, 3);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (Bobby, Brown, 4, 3);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (Ali, Mills, 5, NULL);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (Terry, Silver, 6, NULL);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (Mike, Barnes, 7, 8);

INSERT INTO roles (title, salary, department_id) VALUES (Director Sales, 150000, 1);
INSERT INTO roles (title, salary, department_id) VALUES (Salesman, 85000, 1);
INSERT INTO roles (title, salary, department_id) VALUES (Director Finance, 150000, 2);
INSERT INTO roles (title, salary, department_id) VALUES (Analyst, 85000, 2);
INSERT INTO roles (title, salary, department_id) VALUES (Head of HR, 150000, 3);
INSERT INTO roles (title, salary, department_id) VALUES (Director IT, 150000, 4);
INSERT INTO roles (title, salary, department_id) VALUES (IT Specialist, 85000, 4);
