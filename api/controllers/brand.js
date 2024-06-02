const BrandManager = require('../managers/brand');

class Brand {

    static getList () {
        return BrandManager.get();
    }

    static add (data) {
        return BrandManager.add(data);
    }

    static remove (id) {
        return BrandManager.remove(id);
    }

}

module.exports = Brand;
