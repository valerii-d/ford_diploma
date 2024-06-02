const MySQL = require('../db/MySQL');
const mysql = new MySQL();

class ClientManager {

    static async getList() {
        try {
            return await mysql.execute(`
            SELECT
                *,
                CONCAT(name, ' (', phone, ')') as namePhone
            FROM
                client
        `);
        } catch (error) {
            console.error(error);
        }
    }

    static async create(data) {
        return await mysql.execute(`
            INSERT INTO
            client
                (name, email, phone, car)
            VALUES
                ('${data.name}', '${data.email}', '${data.phone}', '${data.car}')
        `);
    }

    static async remove(id) {
        return await mysql.execute(`
            DELETE FROM
                client
            WHERE
                id = ${id}
        `);
    }

    static async edit(data) {
        return await mysql.execute(`
            UPDATE
                client
            SET
                name = '${data.name}',
                email = '${data.email}',
                phone = '${data.phone}',
                car = '${data.car}'
            WHERE
                id = ${data.id}
        `);
    }

}

module.exports = ClientManager;
