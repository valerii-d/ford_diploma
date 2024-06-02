const ClientManager = require('../managers/client');

class Client {

    static getList () {
        return ClientManager.getList();
    }

    static create (data) {
        return ClientManager.create(data);
    }

    static remove (id) {
        return ClientManager.remove(id);
    }

    static edit (data) {
        return ClientManager.edit(data);
    }

}

module.exports = Client;
