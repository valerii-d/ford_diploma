function combineArrays(arr1, arr2) {
    const combined = [];
    for (const elem1 of arr1) {
        for (const elem2 of arr2) {
            combined.push([...elem1, elem2]);
        }
    }
    return combined;
}

module.exports = (arrays) => {
    return arrays.reduce((accumulator, currentArray) => {
        return combineArrays(accumulator, currentArray);
    }, [[]]);
}
