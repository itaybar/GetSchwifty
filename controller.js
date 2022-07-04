import {generateTable} from './model.js';
import {drawTableFromNumberArray} from './view.js';

export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function getNumberOpposites(table, elementPoint) {
    let numberOpposites = 0;
                let rowIndex = elementPoint.x
                for (let y = elementPoint.y; y < table.length; y++) {
                    for (let x = rowIndex; x < table[y].length; x++) {
                        if (table[y][x] !== 0 && table[y][x] < table[elementPoint.y][elementPoint.x]) {
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
        IsSwitchable: function(blockPoint, emptyPoint) {
            return Math.abs(blockPoint.x - emptyPoint.x) + Math.abs(blockPoint.y - emptyPoint.y) === 1;
        }
    }
    return checker;
}

export function isTableSolved(table) {
    let numberOpposites = 0;
    for (let y = 0; y < table.length; y++) {
        for (let x = 0; x < table[y].length; x++) {
            if (table[y][x] !== 0) {
                numberOpposites += getNumberOpposites(table,new Point(x,y));
            }
        }
    }
    return numberOpposites === 0;
}

function main() {
    let size = 3;
    do {
        var table = generateTable(size);
    } while (!checkTableValidity(table));
    drawTableFromNumberArray(table)
}

main();