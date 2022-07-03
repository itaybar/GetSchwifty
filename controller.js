import {generateTable} from './model.js';

function getNumberOpposites(table, elementY, elementX) {
    let numberOpposites = 0;
    for (let y = elementY; y < table.length; y++) {
        for (let x = elementX; x < table[y].length; x++) {
            if (table[y][x] !== 0 && table[y][x] < table[elementY][elementX]) {
                ++numberOpposites;
            }
        }
    }
    return numberOpposites
}

function checkTableValidity(table) {
    let numberOpposites = 0;
    let zeroYIndex = 0;
    for (let y = 0; y < table.length; y++) {
        for (let x = 0; x < table[y].length; x++) {
            if (table[y][x] !== 0) {
                numberOpposites += getNumberOpposites(table, y, x);
            }
            else {
                zeroYIndex = y;
            }
        }
    }
    if (table[0].length % 2 === 0){
        numberOpposites += zeroYIndex + 1;
    }
    return numberOpposites % 2 === 0;
}

function main() {
    let size = 3;
    do {
        var table = generateTable(size);
    } while (!checkTableValidity(table));
    console.log(table);
}

main();