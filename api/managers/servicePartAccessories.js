const MySQL = require('../db/MySQL');
const mysql = new MySQL();

class servicePartAccessoriesManager {

    static async addPart(data) {
        const valuesToInsert = [];
        data.parts.forEach(value => {
            valuesToInsert.push(`(${data.serviceId}, ${value})`);
        });
        return await mysql.execute(`
            INSERT INTO
                service_part_accessory
                (service_id, part_id)
            VALUES
                ${valuesToInsert.join(',')}
        `);
    }

    static async addAccessory(data) {
        const valuesToInsert = [];
        data.accessories.forEach(value => {
            valuesToInsert.push(`(${data.serviceId}, ${value})`);
        });
        return await mysql.execute(`
            INSERT INTO
                service_part_accessory
                (service_id, accessory_id)
            VALUES
                ${valuesToInsert.join(',')}
        `);
    }

    static async remove(id) {
        return await mysql.execute(`
            DELETE FROM
                service_part_accessory
            WHERE
                service_id = ${id}
        `);
    }

}

module.exports = servicePartAccessoriesManager;
