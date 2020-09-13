var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");
const { throwError } = require("rxjs");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "employeetracker"
});

connection.connect(function (err) {
    console.log(`,-----------------------------------------------------.
    |                                                     |
    |     _____                 _                         |
    |    | ____|_ __ ___  _ __ | | ___  _   _  ___  ___   |
    |    |  _| | '_ \` _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\  |
    |    | |___| | | | | | |_) | | (_) | |_| |  __/  __/  |
    |    |_____|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___|  |
    |                    |_|            |___/             |
    |                                                     |
    |     __  __                                          |
    |    |  \\/  | __ _ _ __   __ _  __ _  ___ _ __        |
    |    | |\\/| |/ _\` | '_ \\ / _\` |/ _\` |\/ _ \\ '__|       |
    |    | |  | | (_| | | | | (_| | (_| |  __/ |          |
    |    |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|          |
    |                              |___/                  |
    |                                                     |
    \`-----------------------------------------------------'
    `);

    if (err) throw err;
    runStart();

    function runStart() {
        inquirer
            .prompt({
                name: "action",
                type: "list",
                message: "What would you like to do?",
                choices: [
                    "View All Employees",
                    "View All Employees BY Department",
                    "View All Employees By Manager",
                    "Add Employee",
                    "Remove Employee",
                    "Update Employee Role",
                    "Update Employee Manager",
                    "Exit"
                    //Bonus
                ]
            })
            .then(function (answer) {
                switch (answer.action) {
                    case "View All Employees":
                        viewEmployees();
                        break;

                    case "View All Employees BY Department":
                        viewEmployeesDepartment();
                        break;

                    case "View All Employees By Manager":
                        viewEmployeesManager();
                        break;

                    case "Add Employee":
                        addEmployee();
                        break;

                    case "Remove Employee":
                        removeEmployee();
                        break;

                    case "Update Employee Role":
                        updateEmployeeRole();
                        break;

                    case "Update Employee Manager":
                        updateEmployeeManager();
                        break;
                    case "Exit":
                        connection.end();
                        break;
                }
            });
    }

    function viewEmployees() {
        console.log("\n\n")
        connection.query("SELECT employees.first_name, employees.last_name, roles.title, managers.first_name AS \"manager\", departments.name AS \"Department\" "
            + "FROM employees "
            + "LEFT JOIN roles ON employees.role_id = roles.id "
            + "LEFT JOIN departments ON roles.department_id = departments.id "
            + "LEFT JOIN employees managers ON employees.manager_id = managers.id GROUP BY employees.id",
            function (err, res) {
                if (err) throw err;
                // Log all results of the SELECT statement
                console.table(res);
                runStart();
            });
    }

    function viewEmployeesDepartment() {
        console.log("\n\n")
        connection.query("SELECT departments.name AS \"Department\", employees.first_name, employees.last_name, roles.title "
            + "FROM employees "
            + "LEFT JOIN roles ON employees.role_id = roles.id "
            + "LEFT JOIN departments ON roles.department_id = departments.id",
            function (err, res) {
                if (err) throw err;
                // Log all results of the SELECT statement
                console.table(res);
                runStart();
            });
    }


    function viewEmployeesManager() {
        console.log("\n\n")
        connection.query("SELECT employees.first_name, employees.last_name, roles.title, managers.first_name AS \"manager\", departments.name AS \"Department\" "
            + "FROM employees "
            + "LEFT JOIN roles ON employees.role_id = roles.id "
            + "LEFT JOIN departments ON roles.department_id = departments.id "
            + "LEFT JOIN employees managers ON employees.manager_id = managers.id GROUP BY employees.id",
            function (err, res) {
                if (err) throw err;
                // Log all results of the SELECT statement
                console.table(res);
                runStart();
            });
    };

    function addEmployee() {
        let employee = [];
        let role = [];

        connection.query(`SELECT * FROM roles`, function (err, data) {
            if (err) throw err;

            for (let i = 0; i < data.length; i++) {
                role.push(data[i].title);
            }

            connection.query(`SELECT * FROM employees`, function (err, data) {
                if (err) throw err;

                for (let i = 0; i < data.length; i++) {
                    employee.push(data[i].first_name);
                }

                inquirer
                .prompt([
                    {
                        name: 'first_name',
                        message: "what's the employees First Name",
                        type: 'input'
                    },
                    {
                        name: 'last_name',
                        message: 'What is their last name?',
                        type: 'input',
                    },
                    {
                        name: 'role_id',
                        message: 'What is their role?',
                        type: 'list',
                        choices: role,
                    },
                    {
                        name: 'manager_id',
                        message: "Who is their manager?",
                        type: 'list',
                        choices: ['none'].concat(employee)
                    }
                ]).then(function ({ first_name, last_name, role_id, manager_id}) {
                    let queryText = `INSERT INTO employees (first_name, last_name, role_id`;
                    if (manager_id != 'none') {
                        queryText += `, manager_id) VALUES ('${first_name}', '${last_name}', ${role.indexOf(role_id)}, ${employee.indexOf(manager_id) +1})`
                    } else {
                        queryText += `) VALUES ('${first_name}', '${last_name}', ${role.indexOf(role_id) + 1})`
                    }
                    console.log("\n");
                    console.log(queryText);
                    console.log("\n")

                    connection.query(queryText, function (err, data){
                        if (err) throw err;

                        runStart();
                    })
                })
            })
        })

    };

    function removeEmployee() {
        let employeeList = [];
        connection.query(
            "SELECT employees.first_name, employees.last_name FROM employees", (err, res) => {
                for (let i = 0; i < res.length; i++){
                    employeeList.push(res[i].first_name + " " + res[i].last_name);
                }
                inquirer
                .prompt([
                    {
                        type: "list", 
                        message: "Which employee would you like to delete?",
                        name: "employee",
                        choices: employeeList
                  
                      },
                ])
                .then (function(res){
                    connection.query(
                      `DELETE FROM employees WHERE concat(first_name, ' ' ,last_name) = '${res.employee}'`,
                        function(err, res) {
                        if (err) throw err;
                        console.log( "\n\n Employee deleted!\n");
                     runStart();
                        });
                    });
            }
        )
    };

    function updateEmployeeRole() {

    };

    function updateEmployeeManager() {

    };



});