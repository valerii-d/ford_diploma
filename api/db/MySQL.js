const mysql = require('mysql2/promise');

class MySQL {

    constructor() {
        this.configCreds = {
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USERNAME,
            password: process.env.MYSQL_PASSWORD,
            port: process.env.MYSQL_PORT,
            database: process.env.MYSQL_DATABASE
        };
        this.connection = null;
    }

    async execute(query) {
        try {
            this.connection = await mysql.createConnection(this.configCreds);
            const [rows] = await this.connection.execute(query);
            await this.connection.end();
            return rows;
        } catch (error) {
            console.error(error);
        }
    }

}

module.exports = MySQL;
