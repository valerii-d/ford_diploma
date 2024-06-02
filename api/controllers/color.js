const ColorManager = require('../managers/color');

class Color {

    static getList () {
        return ColorManager.get();
    }

    static add (data) {
        return ColorManager.add(data);
    }

    static remove (id) {
        return ColorManager.remove(id);
    }

}

module.exports = Color;
