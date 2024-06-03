const MySQL = require('../db/MySQL');
const mysql = new MySQL();

class ServiceOrderManager {

    static async getList() {
        try {
            return await mysql.execute(`
            SELECT
                so.id as id,
                so.car as car,
                so.vin as vin,
                so.description as description,
                DATE_FORMAT(so.date_added, '%d-%m-%Y') as dateAdded,
                so.status as status,
                so.service_type as serviceType,
                CONCAT(client.name, ' (', client.phone, ')') as clientData,
                (   
                    SELECT 
                        GROUP_CONCAT(parts.name SEPARATOR ', ') as name
                    FROM 
                        service_part_accessory spa
                    LEFT JOIN
                        parts
                        ON parts.id = spa.part_id
                    WHERE 
                        spa.service_id = so.id
                ) AS partsNames,
                (   
                    SELECT 
                        GROUP_CONCAT(accessory.name SEPARATOR ', ') as name
                    FROM 
                        service_part_accessory spa
                    LEFT JOIN
                        accessory
                        ON accessory.id = spa.accessory_id
                    WHERE 
                        spa.service_id = so.id
                ) AS accessoriesNames
            FROM
                service_order so
            LEFT JOIN
                client
                ON client.id = so.client_id
        `);
        } catch (error) {
            console.error(error);
        }
    }

    static async create(data) {
        return await mysql.execute(`
            INSERT INTO
                service_order
                (car, vin, description, client_id, status, service_type)
            VALUES
                ('${data.car}', '${data.vin}', '${data.description}', ${data.clientId}, 'В роботі', '${data.serviceType}')
        `);
    }

    static async remove(id) {
        return await mysql.execute(`
            DELETE FROM
                service_order
            WHERE
                id = ${id}
        `);
    }

    static async update(status) {
        return await mysql.execute(`
            UPDATE
                service_order
            SET
                status = '${status}'
            WHERE
                id = ${data.id}
        `);
    }

}

module.exports = ServiceOrderManager;
