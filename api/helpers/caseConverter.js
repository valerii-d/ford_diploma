class CaseConverter {
    static camelToSnake(camelCaseStr) {
        return camelCaseStr.replace(/([A-Z])/g, '_$1').toLowerCase();
    }
}

module.exports = CaseConverter;
