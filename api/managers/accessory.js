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

    static async update(accessoryIds) {
        const valuesToInsert = [];
        accessoryIds.forEach(value => {
            valuesToInsert.push(value);
        });
        return await mysql.execute(`
            UPDATE
                accessory
            SET
                quantity = quantity - 1
            WHERE 
                id IN (${valuesToInsert.join(',')})
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
