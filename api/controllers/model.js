const ModelManager = require('../managers/model');

class Model {

    static getList () {
        return ModelManager.get();
    }

    static add (data) {
        return ModelManager.add(data);
    }

    static remove (id) {
        return ModelManager.remove(id);
    }

}

module.exports = Model;
