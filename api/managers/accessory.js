const MySQL = require('../db/MySQL');
const mysql = new MySQL();

class AccessoryManager {

    static async get() {
        try {
            return await mysql.execute(`
            SELECT
                *
            FROM
                accessory
        `);
        } catch (error) {
            console.error(error);
        }
    }

    static async add(data) {
        return await mysql.execute(`
            INSERT INTO
                accessory
                (name, quantity, price)
            VALUES
                ('${data.name}', ${data.quantity}, '${data.price}')
        `);
    }

    static async remove(id) {
        return await mysql.execute(`
            DELETE FROM
                accessory
            WHERE
                id = ${id}
        `);
    }

}

module.exports = AccessoryManager;
