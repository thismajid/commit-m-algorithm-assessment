const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Entered input (like 3 3) : ', (input) => {
    if(!input) throw new Error('Please entered input!')

    const [m, n] = input.split(' ').map(Number);
    const { actions, grid } = generateApartmentGrid(m, n);

    console.log(actions.join('\n'));
    console.log("--");
    grid.map((item) => console.log(item.join(' ')))
});

const generateApartmentGrid = (m,n) => {
    const actions = [];
    const grid = Array.from({ length: m }, () => Array(n).fill(null));

    // blue apartment
    actions.push(`0 0 b`);
    grid[0][0] = 'b';

    // red apartment
    actions.push(`1 1 r`);
    grid[1][1] = 'r';

    // replace blue apartment with green
    actions.push(`0 0 x`);
    grid[0][0] = '';
    actions.push(`0 0 g`);
    grid[0][0] = 'g';

    // fill the others with green
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (!grid[i][j]) {
                actions.push(`${i} ${j} g`);
                grid[i][j] = 'g';
            }
        }
    }

    return {
        actions,
        grid
    }
}
