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
    let x = -1, y = -1;
    return function TrySwitch(blockX, blockY) {
        console.log("trying switch ", blockX, " ", blockY);
        if (x !== -1 && y !== -1){
            if (table[blockY][blockX] === 0 || table[y][x] === 0) {
                if (Math.abs(blockX - x) === 0 && Math.abs(blockY - y) === 1){
                    return true;
                }
                if (Math.abs(blockX - x) === 1 && Math.abs(blockY - y) === 0){
                    return true;
                }
            }
            // TODO: call notifyError in view
        }
        else {
            x = blockX;
            y = blockY;
        }
        return false;
    }
}

function main() {
    let size = 3;
    do {
        var table = generateTable(size);
    } while (!checkTableValidity(table));
    console.log(table);
    drawTableFromNumberArray(table)
}

main();