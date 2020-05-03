// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email) {
        this.name = name
        this.id = id
        this.email = email
    }
    getName() {
        return this.name
    }
    getId() {
        return this.id
    }
    getEmail() {
        return this.email
    }
    getRole() {
        if (this.role === "Engineer") {
            return "Engineer"
        } else if (this.role === "Intern") {
            return "Intern"
        } else if (this.role === "Manager") {
            return "Manager"
        } else {
            return "Employee"
        }
    }
}

module.exports = Employee