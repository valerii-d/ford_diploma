const ServiceOrderManager = require('../managers/serviceOrder');
const ServicePartAccessory = require('../managers/servicePartAccessories');

class ServiceOrder {

    static getList () {
        return ServiceOrderManager.getList();
    }

    static async add (data) {
        const result = await ServiceOrderManager.create(data);
        if(data.accessories.length > 0) {
            return ServicePartAccessory.addAccessory({
                serviceId: result.insertId,
                accessories: data.accessories
            });
        }
        if(data.parts.length > 0) {
            return ServicePartAccessory.addPart({
                serviceId: result.insertId,
                parts: data.parts
            });
        }
    }

    static async remove (id) {
        await ServicePartAccessory.remove(id);
        return ServiceOrderManager.remove(id);
    }

    static update (status) {
        return ServiceOrderManager.update(status);
    }

}

module.exports = ServiceOrder;
