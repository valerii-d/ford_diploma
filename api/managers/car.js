const MySQL = require('../db/MySQL');
const mysql = new MySQL();

class CarManager {

    static async get() {
        try {
            return await mysql.execute(`
            SELECT
                car.*,
                color.name as color,
                model.name as model
            FROM
                car
            LEFT JOIN
                color
                ON color.id = car.color_id
            LEFT JOIN
                model
                ON model.id = car.model_id
            WHERE
                car.quantity > 0
        `);
        } catch (error) {
            console.error(error);
        }
    }

    static async add(data) {
        return await mysql.execute(`
            INSERT INTO
                car
                (equipment, engine_type, engine_capacity, price, quantity, brand_id, model_id, color_id)
            VALUES
                ('${data.equipment}', '${data.engineType}', '${data.engineCapacity}', '${data.price}', ${data.quantity}, ${data.brandId}, ${data.modelId}, ${data.colorId})
        `);
    }

    static async update(carId) {
        return await mysql.execute(`
            UPDATE
                car
            SET
                quantity = quantity - 1
            WHERE 
                id = ${carId}
        `);
    }

    static async remove(id) {
        return await mysql.execute(`
            DELETE FROM
                car
            WHERE
                id = ${id}
        `);
    }

}

module.exports = CarManager;
