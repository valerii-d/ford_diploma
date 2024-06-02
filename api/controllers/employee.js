const EmployeeManager = require('../managers/employee');

class Employee {

    static getEmployeesList () {
        return EmployeeManager.getEmployeesList();
    }

    static createEmployee (data) {
        return EmployeeManager.createEmployees(data);
    }

    static removeEmployee (id) {
        return EmployeeManager.removeEmployee(id);
    }

    static editEmployee (data) {
        return EmployeeManager.editEmployee(data);
    }

}

module.exports = Employee;
