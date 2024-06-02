const MySQL = require('../db/MySQL');
const mysql = new MySQL();

class ModelManager {

    static async get() {
        try {
            return await mysql.execute(`
            SELECT
                *
            FROM
                model
        `);
        } catch (error) {
            console.error(error);
        }
    }

    static async add(data) {
        return await mysql.execute(`
            INSERT INTO
                model
                (name)
            VALUES
                ('${data.name}')
        `);
    }

    static async remove(id) {
        return await mysql.execute(`
            DELETE FROM
                model
            WHERE
                id = ${id}
        `);
    }

}

module.exports = ModelManager;
