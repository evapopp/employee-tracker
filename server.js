const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'EatPussyNotCats8',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

function init(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'initalQuestions',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'Quit'
            ]
        }
    ])
    .then(({initalQuestions}) => {
        if (initalQuestions === 'View All Employees'){
            viewEmployees();
        } else if (initalQuestions === 'Add Employee'){
            addEmployee();
        } else if (initalQuestions === 'Update Employee Role'){
            updateEmployee();
        } else if (initalQuestions === 'View All Roles'){
            viewRoles();
        } else if (initalQuestions === 'Add Role'){
            addRole();
        } else if (initalQuestions === 'View All Departments'){
            viewDepartments();
        } else if (initalQuestions === 'Add Department'){
            addDepartment();
        } else if (initalQuestions === 'Quit'){
            quitApp();
        }
    })
}

function viewDepartments(){
    db.query('SELECT * FROM department', function (err, results){ 
        if (err){
            console.log(err);
        } else {
            console.table(results);
            init();
        }
    })
}

function viewRoles(){
    db.query('SELECT role.id, role.title, role.salary, department.department_name FROM role LEFT JOIN department ON role.department_id = department.id ORDER BY role.id', function(err, results){
        if (err) {
            console.log(err);
        } else {
            console.table(results);  
            init();  
        }
        
    })
}

function viewEmployees(){
    db.query(`SELECT employee.first_name, employee.last_name, role.title, department.department_name, role.salary, employee.manager_id FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id` , function(err, results){
        if (err) {
            console.log(err);
        } else {
            console.table(results);
            init();
        } 
    })
}

function addDepartment(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message:'Please enter a department name to add',
        }
    ]).then(({ departmentName }) =>{
        db.query(`INSERT department (department_name) VALUES ('${departmentName}')`);
        console.log(`${departmentName} added to Departments!`)
    }).then(() =>{
        init();
    })
}

function addEmployee(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'employeeFirstName',
            message: `What is the Employee's first name?`,
        },
        {
            type: 'input',
            name: 'employeeLastName',
            message: `What is the Employee's last name?`,
        },
        {
            type: 'input',
            name: 'employeeRole',
            message: 'Enter the role id for the Employee',
        },
        {
            type: 'input',
            name: 'employeeManager',
            message: `Enter the id of the Employee's Manager`,
        }
    ]).then(function (answers){
        db.query(`INSERT employee (first_name, last_name, role_id, manager_id) VALUES ('${answers.employeeFirstName}', '${answers.employeeLastName}', '${answers.employeeRole}', '${answers.employeeManager}')`);
        console.log(`You added ${answers.employeeFirstName} as a new Employee!`);
        init();
    });
}

function addRole(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'roleAdded',
            message: 'Input the title of the role you would you like to add',
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'Input the salary of the role you are adding',
        },
        {
            type: 'input',
            name: 'roleDepartment',
            message: 'Assign the new role to a department id',
        }
    ]).then(function (answers){
        db.query(`INSERT role (title, salary, department_id) VALUES ('${answers.roleAdded}', '${answers.roleSalary}', '${answers.roleDepartment}')`);
        console.log(`${answers.roleAdded} was added as a new Role!`)
        init();
    });
}

function updateEmployee (){
    inquirer.prompt([
        {
            type: 'input',
            name: 'updateEmployee',
            message: `Enter the id number of the Employee whose Role you would like to update`,
        },
        {
            type: 'input',
            name: 'updateRoleId',
            message: 'input the id number of the role you would like to assign the Employee to'
        }
    ]).then(function (answers) {
        db.query(`UPDATE employee SET role_id = '${answers.updateRoleId}' WHERE id = ${answers.updateEmployee}`)
        console.log('Employee updated!')
        init();
    })
    
}

function quitApp (){
    console.log('Thanks for your inquiries!')
    process.exit();
}

init()
