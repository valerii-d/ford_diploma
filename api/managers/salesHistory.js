const MySQL = require('../db/MySQL');
const mysql = new MySQL();

class SalesHistoryManager {

    static async getCarList() {
        try {
            return await mysql.execute(`
                SELECT
                    sh.id as id,
                    sh.vin as vin,
                    DATE_FORMAT(sh.date_added, '%d-%m-%Y') as dateAdded,
                    car.equipment as carEquipment,
                    car.engine_type as carEngineType,
                    car.engine_capacity as carEngineCapacity,
                    car.price as carPrice,
                    color.name as carColor,
                    brand.name as carBrand,
                    model.name as carModel,
                    CONCAT(client.name, ' (', client.phone, ')') as clientInfo
                FROM
                    sales_history sh
                LEFT JOIN
                    client
                    ON client.id = sh.client_id
                LEFT JOIN
                    car
                    ON car.id = sh.car_id
                LEFT JOIN
                    brand
                    ON brand.id = car.brand_id
                LEFT JOIN
                    model
                    ON model.id = car.model_id
                LEFT JOIN
                    color
                    ON color.id = car.color_id
                WHERE
                    sh.car_id IS NOT NULL
            `);
        } catch (error) {
            console.error(error);
        }
    }

    static async getSalesCount(data) {
        try {
            return await mysql.execute(`
                SELECT
                    COUNT(CASE WHEN car_id IS NOT NULL THEN 1 END) AS cars,
                    COUNT(CASE WHEN part_id IS NOT NULL THEN 1 END) AS parts,
                    COUNT(CASE WHEN accessory_id IS NOT NULL THEN 1 END) AS accessories
                FROM
                    sales_history
                WHERE
                    date_added BETWEEN '${data.firstDayFormatted}' AND '${data.lastDayFormatted}'
            `);
        } catch (error) {
            console.error(error);
        }
    }

    static async createCar(data) {
        return await mysql.execute(`
            INSERT INTO
                sales_history
                (client_id, car_id, vin)
            VALUES
                ('${data.clientId}', '${data.carId}', '${data.vin}')
        `);
    }

    static async createAccessory(data) {
        const valuesToInsert = [];
        data.accessories.forEach(value => {
            valuesToInsert.push(`(${data.clientId}, ${value})`);
        });
        return await mysql.execute(`
            INSERT INTO
                sales_history
                (client_id, accessory_id)
            VALUES
                ${valuesToInsert.join(',')}
        `);
    }

    static async createPart(data) {
        const valuesToInsert = [];
        data.parts.forEach(value => {
            valuesToInsert.push(`(${data.clientId}, ${value})`);
        });
        return await mysql.execute(`
            INSERT INTO
                sales_history
                (client_id, part_id)
            VALUES
                ${valuesToInsert.join(',')}
        `);
    }

}

module.exports = SalesHistoryManager;
