function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export function generateTable(rows) {
    const numberOptions = [...Array(rows * rows).keys()];
    let tableNumbers = [];
    for (let i = 0; i < rows; i++) {
        let subTable = [];
        for (let j = 0; j < rows; j++) {
            const index = getRandomInt(numberOptions.length);
            subTable.push(numberOptions[index]);
            numberOptions.splice(index, 1);
        }
        tableNumbers.push(subTable)
    }
    return tableNumbers;
}