-- Drops the employeetracker_db if it exists currently --
DROP DATABASE IF EXISTS employeetracker_db;

-- Creates the employeetracker_db database --
CREATE DATABASE employeetracker_db;

-- Use employeetracker_db --
USE employeetracker_db;

-- Creates the table "department" within inventory_db --
CREATE TABLE department












-- As the image illustrates, your schema should contain the following three tables:

-- department

-- id: INT PRIMARY KEY

-- name: VARCHAR(30) to hold department name

-- role

-- id: INT PRIMARY KEY

-- title: VARCHAR(30) to hold role title

-- salary: DECIMAL to hold role salary

-- department_id: INT to hold reference to department role belongs to

-- employee

-- id: INT PRIMARY KEY

-- first_name: VARCHAR(30) to hold employee first name

-- last_name: VARCHAR(30) to hold employee last name

-- role_id: INT to hold reference to employee role

-- manager_id: INT to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)

