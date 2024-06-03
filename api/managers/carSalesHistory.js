const MySQL = require('../db/MySQL');
const mysql = new MySQL();

class CarSalesHistoryManager {

    static async getList() {
        try {
            return await mysql.execute(`
                SELECT
                    sh.id as id,
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

    static async create(data) {
        return await mysql.execute(`
            INSERT INTO
                sales_history
                (client_id, car_id)
            VALUES
                ('${data.clientId}', '${data.carId}')
        `);
    }

}

module.exports = CarSalesHistoryManager;
