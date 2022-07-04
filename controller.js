import {generateTable} from './model.js';
import {drawTableFromNumberArray} from './view.js';

function getNumberOpposites(table, elementY, elementX) {
    let numberOpposites = 0;
    let rowIndex = elementX
    for (let y = elementY; y < table.length; y++) {
        for (let x = rowIndex; x < table[y].length; x++) {
            if (table[y][x] !== 0 && table[y][x] < table[elementY][elementX]) {
                ++numberOpposites;
            }
            rowIndex = 0;
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

export function checkBlockSwitch(table){
    let checker = {
        IsSwitchable: function(blockX, blockY, emptyX, emptyY) {
            return Math.abs(blockX - emptyX) + Math.abs(blockY - emptyY) === 1;
        }
    }
    return checker;
}

function main() {
    let size = 3;
    do {
        var table = generateTable(size);
    } while (!checkTableValidity(table));
    drawTableFromNumberArray(table)
}

main();