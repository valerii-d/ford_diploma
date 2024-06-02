const PartsManager = require('../managers/parts');

class Parts {

    static getList () {
        return PartsManager.get();
    }

    static add (data) {
        return PartsManager.add(data);
    }

    static remove (id) {
        return PartsManager.remove(id);
    }

}

module.exports = Parts;
