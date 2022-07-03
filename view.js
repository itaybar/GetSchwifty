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
                let points = blockSwitchTester.IsSwitchable(...getIndexById(table, ev.target.id));
                if (points){
                    switchBlocks(table, ...points);
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