const ServiceOrderManager = require('../managers/serviceOrder');

class ServiceOrder {

    static getList () {
        return ServiceOrderManager.getList();
    }

    static add (data) {
        return ServiceOrderManager.create(data);
    }

    static remove (id) {
        return ServiceOrderManager.remove(id);
    }

    static update (status) {
        return ServiceOrderManager.update(status);
    }

}

module.exports = ServiceOrder;
