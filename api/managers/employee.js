const MySQL = require('../db/MySQL');
const mysql = new MySQL();

class AdminManager {

    static async getEmployeesList() {
        try {
            return await mysql.execute(`
            SELECT
                *
            FROM
                employee
        `);
        } catch (error) {
            console.error(error);
        }
    }

    static async createEmployees(data) {
        return await mysql.execute(`
            INSERT INTO
                employee
                (name, email, phone, password, role)
            VALUES
                ('${data.name}', '${data.email}', '${data.phone}', '${data.password}', '${data.role}')
        `);
    }

    static async removeEmployee(id) {
        return await mysql.execute(`
            DELETE FROM
                employee
            WHERE
                id = ${id}
        `);
    }

    static async editEmployee(data) {
        return await mysql.execute(`
            UPDATE
                employee
            SET
                name = '${data.name}',
                email = '${data.email}',
                password = '${data.password}',
                phone = '${data.phone}',
                role = '${data.role}'
            WHERE
                id = ${data.id}
        `);
    }

}

module.exports = AdminManager;
