const AccessoryManager = require('../managers/accessory');

class Accessory {

    static getList () {
        return AccessoryManager.get();
    }

    static add (data) {
        return AccessoryManager.add(data);
    }

    static remove (id) {
        return AccessoryManager.remove(id);
    }

}

module.exports = Accessory;
