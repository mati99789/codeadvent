import {readInputFile} from "../utils/readFile.js";

type Direction = [number, number];

const directions: Direction[] = [
    [-1, 0],  // up
    [1, 0],   // down
    [0, -1],  // left
    [0, 1],   // right
    [-1, -1], // up-left diagonal
    [-1, 1],  // up-right diagonal
    [1, -1],  // down-left diagonal
    [1, 1]    // down-right diagonal
]

const gridCreation = (data: string) => {

    const lines = data.split('\n');

    return lines.map(line => line.trim().split(''));

}

export const day4 = async () => {
    const data = await readInputFile('./src/day4/input.txt')

    const grid = gridCreation(data)

    let count = 0
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            for (const dir of directions) {
                if (checkDirection(grid, row, col, dir)) {
                    count++;
                }
            }
        }
    }

    console.log(count)
    console.log(partTwo())
}


function checkDirection(grid: string[][], row: number, column: number, direction: Direction): boolean {
    const [x, y] = direction;
    const word = "XMAS";

    // First check if word would fit within bounds
    for (let i = 0; i < word.length; i++) {
        const newRow = row + x * i;
        const newCol = column + y * i;
        if (newRow < 0 || newRow >= grid.length || newCol < 0 || newCol >= grid[0].length) {
            return false;
        }
    }

    // Now check if the letters match XMAS
    for (let i = 0; i < word.length; i++) {
        const newRow = row + x * i;
        const newCol = column + y * i;
        if (grid[newRow][newCol] !== word[i]) {
            return false;
        }
    }

    return true;
}

function checkXMAS(grid: string[][], centerRow: number, centerCol: number): boolean {
    // For each diagonal of the X, we need to check both "MAS" and "SAM"
    const patterns = ["MAS", "SAM"];

    // These represent the two diagonals of X
    const diagonals: Direction[] = [
        [-1, -1],
        [-1, 1]
    ];

    // For each diagonal
    for (const diagonal of diagonals) {
        let foundValid = false;
        const [dx, dy] = diagonal;

        // Check both patterns (MAS and SAM)
        for (const pattern of patterns) {
            // Check if we can form the pattern starting from either end
            // Start from top
            let validFromTop = true;
            for (let i = 0; i < pattern.length; i++) {
                const newRow = centerRow + dx * (i - 1); // -1 to center the X
                const newCol = centerCol + dy * (i - 1);

                if (newRow < 0 || newRow >= grid.length ||
                    newCol < 0 || newCol >= grid[0].length ||
                    grid[newRow][newCol] !== pattern[i]) {
                    validFromTop = false;
                    break;
                }
            }

            // Start from bottom
            let validFromBottom = true;
            for (let i = 0; i < pattern.length; i++) {
                const newRow = centerRow + (-dx) * (i - 1); // Opposite direction
                const newCol = centerCol + (-dy) * (i - 1);

                if (newRow < 0 || newRow >= grid.length ||
                    newCol < 0 || newCol >= grid[0].length ||
                    grid[newRow][newCol] !== pattern[i]) {
                    validFromBottom = false;
                    break;
                }
            }

            if (validFromTop || validFromBottom) {
                foundValid = true;
                break;
            }
        }

        if (!foundValid) return false; // If we didn't find a valid pattern for this diagonal
    }

    return true;
}

async function partTwo() {
    const data = await readInputFile('./src/day4/input.txt')

    const grid = gridCreation(data)

    let count = 0

    for (let row = 1; row < grid.length - 1; row++) {
        for (let col = 1; col < grid[0].length - 1; col++) {
            if (grid[row][col] === 'A' && checkXMAS(grid, row, col)) {
                count++;
            }
        }
    }

    console.log(count)
}
