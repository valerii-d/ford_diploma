const CarSalesHistoryManager = require('../managers/carSalesHistory');
const CarManager = require('../managers/car');

class CarSalesHistory {

    static getList () {
        return CarSalesHistoryManager.getList();
    }

    static async add (data) {
        await CarManager.update(data.carId);
        return CarSalesHistoryManager.create(data);
    }

}

module.exports = CarSalesHistory;
