-- Drops the employee_tracker_db if it exists currently --
DROP DATABASE IF EXISTS employeetracker;

-- Creates the employee_tracker_db database --
CREATE DATABASE employee_tracker;

-- Use employeetracker_db --
USE employee_tracker;

-- Creates the table "department" within employee_tracker --
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);


CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);


CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id)
    REFERENCES employee(id)
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE,
    ON DELETE SET NULL
);

