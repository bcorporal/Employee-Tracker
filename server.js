const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;


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
    console.log(`Connected to the employeetracker_db database.`)
  );



function init() {
  inquirer
  .prompt([
    {
      type: 'list',
      name: 'Questions',
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
    }])}

