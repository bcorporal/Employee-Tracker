const inquirer = require('inquirer');
const mysql = require('mysql2');
// const express = require("express");
const table = require('console.table');

const PORT = process.env.PORT || 3001;
// const app = express();

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// Connect to database
const connection = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'music1200',
      database: 'employee_tracker'
    });
    connection.connect(err => {
     if (err) throw err;
     console.log('Connected to the employee_tracker database.');
     questions();  
    });


const questions = () => {
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
        'Quit'],
        validate: choice => {
          if (choice) {
            return true;
          } else {
            console.log('Please chose an option')
            return false;
          }
          }
        },
  ]) .then (answers => {
    switch (answers.choice) {
      case 'View all employees':
        return viewEmployees();

      case 'Add employee':
        return addEmployee();

      case 'Update employee role':
        return updateEmployee();

      case 'View all roles':
      return viewRoles();

      case 'Add role':
        addRole();

      case 'View all departments':
        return viewDepartment();

      case 'Add department': 
      return addDepartment();

      // case 'Quit':
      // return quitApp();
     
    };
  });
};

 const viewDepartment = () => {
  console.log('Showing departments');
  const sql = `SELECT department.id AS id, department.name AS department FROM department`;

  connection.query(sql, (err, rows) => {
      if (err) throw err;
      console.table(rows);
      questions();
    });
 };
  
viewRoles = () => {
  console.log('Showing roles');
  const sql = `SELECT roles.id, roles.title, department.name AS department
  FROM roles
  INNER JOIN department ON roles.department_id = department.id`;

  connection.query(sql, (err, rows) => {
    if (err) throw (err);
    console.table(rows);
    questions();
  });
};
  
viewEmployees = () => {
  console.log('Showing employees');
  const sql = `SELECT employee.id, 
      employee.first_name, 
      employee.last_name,
      roles.title,
      department.name AS department,
      roles.salary,
      CONCAT (manager.first_name, " ", manager.last_name) AS manager
      FROM employee
      LEFT JOIN roles ON employee.role_id = roles.id
      LEFT JOIN department ON roles.department_id = department.id
      LEFT JOIN employee manager ON employee.manager_id = manager.id`;

  connection.query(sql, (err, rows) => {
    if (err) throw (err);
    console.table(rows);
    questions();
  });
};

addEmployee = () => {
    inquirer.prompt([
      {
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
    }
  ])
    .then(answer => {
      const params = [answer.firstName, answer.lastName];
    
      const rolesSql = `SELECT roles.id, roles.title FROM roles`;
      connection.query(rolesSql, (err, data) => {
        if (err) throw err;
        
        const role = data.map(({ id, title }) => ({ name: title, value: id}));

      inquirer.prompt([
        {
      type: 'list',
      name: 'role',
      message: 'Enter employees new role',
      choices: role
     }])
      .then(roleSelect => {const role = roleSelect.role;
      params.push(role);
    
      const managerSql = `SELECT * FROM employee`;
      connection.query(managerSql, (err, data) => {
        if (err) throw err;
        const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));

        inquirer.prompt([
          {
            type: 'list',
            name: 'manager',
            message: "Who is the new employee's manager?",
            choices: managers
          }
        ])
        .then(managerSelect => {
          const manager = managerSelect.manager;
          params.push(manager);

          const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
          VALUES (?, ?, ?, ?)`;

      connection.query(sql, params, (err, result) => {
        if (err) throw err;
        console.log("Employee has been added!")

        viewEmployees();
      });
    });
  });
});
});
});
};

addRole = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'role',
      message: 'What is the name of the new role?',
      validate: addRole => {
        if (addRole) {
          return true;
        } else {
          console.log('Please enter a role!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'salary',
      message: "What is the new role's salary",
      validate: addSalary => {
        if (addSalary) {
          return true;
        } else {
          console.log('Please enter a salary!');
          return false;
        }
      }
    }
  ])
  .then(answer => {
    const params = [answer.role, answer.salary];

    
    const rolesSql = `SELECT name, id FROM department`; 

    connection.query(rolesSql, (err, data) => {
      if (err) throw err; 
  
      const dept = data.map(({ name, id }) => ({ name: name, value: id }));

      inquirer.prompt([
      {
        type: 'list', 
        name: 'dept',
        message: "What department is this new role in?",
        choices: dept
      }
      ])
        .then(deptChoice => {
          const dept = deptChoice.dept;
          params.push(dept);

          const sql = `INSERT INTO roles (title, salary, department_id)
           VALUES (?, ?, ?)`;

          connection.query(sql, params, (err, result) => {
            if (err) throw err;
            console.log('Added' + answer.role + " to roles!"); 

            viewRoles();
          });
        });
    });
  });
}; 

addDepartment = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'addDepartment',
      message: 'What new department would you like to add?',
      validate: addDepartment => {
        if (addDepartment) {
            return true;
        } else {
            console.log('Please enter a department!');
            return false;
        }
      }
    }
  ])
  .then(answer => {
    const sql = `INSERT INTO department (name)
                VALUES (?)`;
    connection.query(sql, answer.addDepartment, (err, result) => {
      if (err) throw err;
      console.log('Added ' + answer.addDepartment + " to departments!"); 

      viewDepartment();
    });
  });
}; 

updateEmployee = () => {
  const employeeSql = `SELECT * FROM employee`;

  connection.query(employeeSql, (err, data) => {
    if (err) throw err;

    const employees = data.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));

    inquirer.prompt([
      {
        type: 'list',
        name: 'name',
        message: "Which employee would you like to update?",
        choices: employees
      }
    ])
    .then(employeeSelect => {
      const employee = employeeSelect.name;
      const params = []; 
      params.push(employee);

      const roleSql = `SELECT * FROM roles`;

      connection.query(roleSql, (err, data) => {
        if (err) throw err; 

        const roles = data.map(({ id, title }) => ({ name: title, value: id }));
        
          inquirer.prompt([
            {
              type: 'list',
              name: 'role',
              message: "What is the employee's new role?",
              choices: roles
            }
          ])
          .then(roleChoice => {
            const role = roleChoice.role;
            params.push(role); 
              
            let employee = params[0]
            params[0] = role
            params[1] = employee 
              
            const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;

            connection.query(sql, params, (err, result) => {
              if (err) throw err;
              console.log("Employee has been updated!");
            
              viewEmployees();
            });
          });
      });
    });
  });
}; 

