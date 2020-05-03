const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee")

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = []

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// gets role of employee (can ask for universal employee info here because this func will be called on all employees)
function employeeType() {
    return inquirer.prompt([{
            type: "list",
            choices: ["Employee", "Manager", "Intern", "Engineer"],
            name: "newEmployeeRole",
            message: "What role is your team member?"
        },
        {
            type: "input",
            name: "name",
            message: "What is this team member's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is this team member's ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is this team member's Email?"
        },
    ])
}
// Work out how many times to run a loop (This will be asked after each employee is built to determin when to stop)
function moreEmployees() {
    return inquirer.prompt([{
        type: "list",
        choices: ["Yes", "No"],
        name: "makeNewEmployee",
        message: "Would you like to add another team member?"
    }])
}
// depending on employee role, ask specific details
function roleManager() {
    return inquirer.prompt([{
        type: "input",
        name: "officeNumber",
        message: "What is this Manager's office number?"
    }])
}

function roleEngineer() {
    return inquirer.prompt([{
        type: "input",
        name: "github",
        message: "What is this Engineer's GitHub Username"
    }])
}

function roleIntern() {
    return inquirer.prompt([{
        type: "input",
        name: "school",
        message: "What school was/is this Intern enrolled at?"
    }])
}

async function createNewEmployee() {
    try {
        const newbie = await employeeType()
        if (newbie.newEmployeeRole === "Engineer") {
            const newbieEngineer = await roleEngineer()
            let newEngineer = new Engineer(newbie.name, newbie.id, newbie.email, newbieEngineer.github)
            employees.push(newEngineer)
            console.log(employees)

        } else if (newbie.newEmployeeRole === "Intern") {
            const newbieIntern = await roleIntern()
            let newIntern = new Intern(newbie.name, newbie.id, newbie.email, newbieIntern.school)
            employees.push(newIntern)
            console.log(employees)

        } else if (newbie.newEmployeeRole === "Manager") {
            const newbieManager = await roleManager()
            let newManager = new Manager(newbie.name, newbie.id, newbie.email, newbieManager.officeNumber)
            employees.push(newManager)
            console.log(employees)
        } else {
            let newEmployee = new Employee(newbie.name, newbie.id, newbie.email)
            employees.push(newEmployee)
            console.log(employees)
        }
        addAnother = await moreEmployees()
        if (addAnother.makeNewEmployee === "Yes") {
            createNewEmployee()
        } else {
            if (!OUTPUT_DIR) {
                fs.mkdirSync(OUTPUT_DIR)
            } else {
                const writeTo = function (inputHTML) {
                    fs.writeFile(outputPath, inputHTML)
                }
                const html = render(employees)
                writeTo(html)
            }
        }
    } catch (error) {
        console.log(error)
    }
}
createNewEmployee()

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```