import {checkBlockSwitch} from './controller.js';


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
            let localX = x;
            let localY = y;
            blockDom.onclick = () => {
                if (blockSwitchTester(x, y)){
                    console.log('should switch');
                }
            };
            rowDom.appendChild(blockDom);
        }
        tableDOM.appendChild(rowDom);
    }
 }