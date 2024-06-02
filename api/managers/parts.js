const MySQL = require('../db/MySQL');
const mysql = new MySQL();

class PartsManager {

    static async get() {
        try {
            return await mysql.execute(`
            SELECT
                parts.*,
                brand.name as brandCompatibilityName,
                model.name as modelCompatibilityName
            FROM
                parts
            LEFT JOIN
                brand
                ON brand.id = parts.compatibility_brand_id
            LEFT JOIN
                model
                ON model.id = parts.compatibility_model_id
        `);
        } catch (error) {
            console.error(error);
        }
    }

    static async add(data) {
        return await mysql.execute(`
            INSERT INTO
                parts
                (name, price, compatibility_brand_id, compatibility_model_id)
            VALUES
                ('${data.name}', '${data.price}', ${data.compatibilityBrandId}, ${data.compatibilityModelId})
        `);
    }

    static async remove(id) {
        return await mysql.execute(`
            DELETE FROM
                parts
            WHERE
                id = ${id}
        `);
    }

}

module.exports = PartsManager;
