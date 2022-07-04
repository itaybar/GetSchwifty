import {checkBlockSwitch} from './controller.js';

function getIndexById(table, id) {
    for (let y = 0; y < table.length; y++) {
        for (let x = 0; x < table[y].length; x++) {
            if (table[y][x] == id) {
                return [x, y];
            }
        }
    }
}

function  getEmptyBlockIndex(table) {
    return getIndexById(table, 0);
}

export function drawTableFromNumberArray(table) {
    let tableDOM = document.getElementById('game-table');
    let blockSwitchTester = checkBlockSwitch(table)

    for (let y = 0; y < table.length; y++) {
        let rowDom = document.createElement('tr');
        for (let x = 0; x < table[y].length; x++) {
            let blockDom = document.createElement('td');
            blockDom.id = table[y][x];
            if (table[y][x] !== 0) {
                blockDom.innerHTML= table[y][x];
            }
            blockDom.onclick = (ev) => {
                let emptyBlock = getEmptyBlockIndex(table);
                let clickedBlock = getIndexById(table, ev.target.id)
                if (blockSwitchTester.IsSwitchable(...clickedBlock, ...emptyBlock)){
                    let local = table[emptyBlock[1]][emptyBlock[0]];
                    table[emptyBlock[1]][emptyBlock[0]] = table[clickedBlock[1]][clickedBlock[0]];
                    table[clickedBlock[1]][clickedBlock[0]] = local;
                    switchBlocks(table, ...clickedBlock, ...emptyBlock);
                }
            };
            rowDom.appendChild(blockDom);
        }
        tableDOM.appendChild(rowDom);
    }
 }

function swap(node1, node2) {
    var aParent = node1.parentNode;
    var bParent = node2.parentNode;

    var aHolder = document.createElement("div");
    var bHolder = document.createElement("div");

    aParent.replaceChild(aHolder, node1);
    bParent.replaceChild(bHolder, node2);

    aParent.replaceChild(node2, aHolder);
    bParent.replaceChild(node1, bHolder);
}

export function switchBlocks(table, firstX, firstY, secondX, secondY) {
    let firstBlock = document.getElementById(table[firstY][firstX]);
    let secondBlock = document.getElementById(table[secondY][secondX]);

    swap(firstBlock, secondBlock);
 }