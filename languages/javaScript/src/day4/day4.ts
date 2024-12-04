import {readInputFile} from "../utils/readFile.js";

const directions = [
    [0, 1], // right
    [0, -1], // left
    [-1, 0], // up
    [1, 0],  // down
    [1, 1], //down right
    [1, -1], // down left
    [-1, -1], // up left
    [-1, 1] // up right
]

export async function day4() {
    const input = await readInputFile("/src/day4/input.txt");


    const grid = input.split("\n").map((line) => line.trim());

    let count = 0;

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === "X") {
                for (let dir of directions) {
                    const [x, y] = dir;
                    const xBounds = i + x * 3 >= 0 && i + x * 3 < grid.length && i + x * 2 >= 0 && i + x * 2 < grid.length && i + x >= 0 && i + x < grid.length;
                    const yBounds = j + y * 3 >= 0 && j + y * 3 < grid[i].length && j + y * 2 >= 0 && j + y * 2 < grid[i].length && j + y >= 0 && j + y < grid[i].length;

                    if (!xBounds || !yBounds) {
                        continue
                    }
                    if (grid[i + x][j + y] === "M" && grid[i + x * 2][j + y * 2] === "A" && grid[i + x * 3][j + y * 3] === "S") {
                        count++;
                    }
                }
            }
        }
    }

    console.log(count);

    partTwo(grid)
}


function partTwo(grid: string[]) {
    let count = 0;
    // Keep the diagonal directions structure
    const diagonals = [
        [[-1, -1], [1, 1]], // backslash diagonal \
        [[-1, 1], [1, -1]]  // forward slash diagonal /
    ];

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === "A") {
                let validX = true;

                for (const [dir1, dir2] of diagonals) {
                    const [x1, y1] = dir1;
                    const [x2, y2] = dir2;

                    // Check bounds for both ends of this diagonal
                    if (!validPosition(i + x1, j + y1, grid) ||
                        !validPosition(i + x2, j + y2, grid)) {
                        validX = false;
                        break;
                    }

                    // Check if we have M and S (or S and M) at the ends of the diagonal
                    const diagonalPattern = (
                        (grid[i + x1][j + y1] === "M" && grid[i + x2][j + y2] === "S") ||
                        (grid[i + x1][j + y1] === "S" && grid[i + x2][j + y2] === "M")
                    );

                    if (!diagonalPattern) {
                        validX = false;
                        break;
                    }
                }

                if (validX) {
                    count++;
                }
            }
        }
    }

    console.log("Solution two:", count);
    return count;
}

function validPosition(i: number, j: number, grid: string[]): boolean {
    return i >= 0 && i < grid.length && j >= 0 && j < grid[i].length;
}

