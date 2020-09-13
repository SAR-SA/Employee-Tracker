var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table")

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
    if (err) throw err;
    runStart();

    function runStart() {

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

        inquirer
            .prompt({
                name: "action",
                type: "list",
                message: "What would you like to do?",
                choices: [
                    "View All Employees",
                    "View All Employees BY Department",
                    "View All Employees By Manager",
                    new inquirer.Separator(),
                    "Add Employee",
                    "Remove Employee",
                    new inquirer.Separator(),
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
     
    };

    function removeEmployee() {

    };

    function updateEmployeeRole() {

    };

    function updateEmployeeManager() {

    };



});