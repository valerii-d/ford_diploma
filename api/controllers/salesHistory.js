const SalesHistoryManager = require('../managers/salesHistory');
const CarManager = require('../managers/car');
const AccessoryManager = require('../managers/accessory');

class SalesHistory {

    static getCarsList () {
        return SalesHistoryManager.getCarList();
    }

    static async addCar (data) {
        await CarManager.update(data.carId);
        return SalesHistoryManager.createCar(data);
    }

    static async addPart (data) {
        return SalesHistoryManager.createPart(data);
    }

    static async addAccessory (data) {
        await AccessoryManager.update(data.accessories);
        return SalesHistoryManager.createAccessory(data);
    }

    static async salesCount (data) {
        return SalesHistoryManager.getSalesCount(data);
    }

}

module.exports = SalesHistory;
