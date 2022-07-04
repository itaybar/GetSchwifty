import {checkBlockSwitch, isTableSolved, Point} from './controller.js';

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

function notifyWin() {
    document.getElementById('game-table').style.display = 'none';
    document.getElementById('win-sign').style.display = 'block';
}

function swapVals(table, pointA, pointB) {
    let local = table[pointA.y][pointA.x];
    table[pointA.y][pointA.x] = table[pointB.y][pointB.x];
    table[pointB.y][pointB.x] = local;
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
            blockDom.onclick = handleClick;
            rowDom.appendChild(blockDom);
        }
        tableDOM.appendChild(rowDom);
    }

    function handleClick(ev) {
        let emptyBlockPoint = new Point(...getEmptyBlockIndex(table));
        let clickedBlockPoint = new Point(...getIndexById(table, ev.target.id));
        if (blockSwitchTester.IsSwitchable(clickedBlockPoint, emptyBlockPoint)){
            swapVals(table, emptyBlockPoint, clickedBlockPoint);
            switchBlocks(table, clickedBlockPoint, emptyBlockPoint);
            if (isTableSolved(table)){
                console.log("win!!");
                notifyWin();
            }
        }
    }
}

function swapElement(node1, node2) {
    var aParent = node1.parentNode;
    var bParent = node2.parentNode;

    var aHolder = document.createElement("div");
    var bHolder = document.createElement("div");

    aParent.replaceChild(aHolder, node1);
    bParent.replaceChild(bHolder, node2);

    aParent.replaceChild(node2, aHolder);
    bParent.replaceChild(node1, bHolder);
}

export function switchBlocks(table, firstPoint, secondPoint) {
    let firstBlock = document.getElementById(table[firstPoint.y][firstPoint.x]);
    let secondBlock = document.getElementById(table[secondPoint.y][secondPoint.x]);

    swapElement(firstBlock, secondBlock);
 }