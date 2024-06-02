const MySQL = require('../db/MySQL');
const mysql = new MySQL();

class ColorManager {

    static async get() {
        try {
            return await mysql.execute(`
            SELECT
                *
            FROM
                color
        `);
        } catch (error) {
            console.error(error);
        }
    }

    static async add(data) {
        return await mysql.execute(`
            INSERT INTO
                color
                (name)
            VALUES
                ('${data.name}')
        `);
    }

    static async remove(id) {
        return await mysql.execute(`
            DELETE FROM
                color
            WHERE
                id = ${id}
        `);
    }

}

module.exports = ColorManager;
