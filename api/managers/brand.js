const MySQL = require('../db/MySQL');
const mysql = new MySQL();

class BrandManager {

    static async get() {
        try {
            return await mysql.execute(`
            SELECT
                *
            FROM
                brand
        `);
        } catch (error) {
            console.error(error);
        }
    }

    static async add(data) {
        return await mysql.execute(`
            INSERT INTO
                brand
                (name)
            VALUES
                ('${data.name}')
        `);
    }

    static async remove(id) {
        return await mysql.execute(`
            DELETE FROM
                brand
            WHERE
                id = ${id}
        `);
    }

}

module.exports = BrandManager;
