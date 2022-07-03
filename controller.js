import {generateTable} from './model.js';

    let numberOpposites = 0;

    let size = 3;
    do {
        var table = generateTable(size);
    } while (!checkTableValidity(table));
    console.log(table);
}

main();