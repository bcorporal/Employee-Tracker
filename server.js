const inquirer = require('inquirer');
const mysql = require('mysql2');
const express = require("express");
const cTable = require('console.table');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'music1200',
      database: 'employeetracker_db'
    },
    console.log(`Connected to the employeetracker database.`)
  );


function init() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: [
        'View all employees',
        'Add employee',
        'Update employee role',
        'View all roles',
        'Add role',
        'View all departments',
        'Add department',
        'Quit']
    }
  ]).then((answer) => {
    const { choices } = answer;
    
     if (choices === 'View all employees') {
        viewEmployees();
     }
     if (choices === 'Add employee') {
        addEmployee();
     }
     if (choices === 'Update employee role') {     
        updateEmployeeRole();
     }  
     if (choices === 'View all roles') {   
        viewRoles();
     }
     if (choices === 'Add role') {   
          addRole();
     }
     if (choices === 'View all departments') {
          viewDepartments();
     }
     if (choices === 'Add department') {
          addDepartment();
     }
     if (choices === 'Quit') {
      console.log('See ya')
          quitApp();
    }
  })}


  const viewDepartments = () => {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.table(result);
    });
  };
  
  const viewRoles = () => {
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.table(result);
    });
  };
  
  const viewEmployees = () => {
    const sql = `SELECT * FROM employees`;
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.table(result);
    });
  };


   addEmployee = () => {
    inquirer.prompt([{
      type: 'input',
      name: 'firstName',
      message: 'Enter the employees first name',
      validate: firstName => {
        if (firstName) {
          return true;
        } else {
          console.log("Enter the employees first name");
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Enter the employees last name?',
      validate: lastName => {
        if (lastName) {
          return true;
        } else {
          console.log("Enter the employees last name");
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'role',
      message: 'Enter employees new role',
      validate: addRole => {
        if (addRole) {
          return true;
        } else {
          console.log("Please enter a role");
          return false;
        }
      }
    },






    }])
    db.updateEmployeeRole()
    .then(([rows]) => {
      let updateEmployeeRole = rows;
      console.table(updateEmployeeRole);
    }) .then(() => mainMenu());
  }

