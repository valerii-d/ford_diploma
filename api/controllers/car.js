const CarManager = require('../managers/car');

class Car {

    static getList () {
        return CarManager.get();
    }

    static add (data) {
        return CarManager.add(data);
    }

    static remove (id) {
        return CarManager.remove(id);
    }

}

module.exports = Car;
