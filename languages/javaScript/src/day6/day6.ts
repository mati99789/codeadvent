import {readInputFile} from "../utils/readFile.js";

const directions = [
    { name: "up", vector: [-1, 0], symbol: "^" },
    { name: "right", vector: [0, 1], symbol: ">" },
    { name: "down", vector: [1, 0], symbol: "v" },
    { name: "left", vector: [0, -1], symbol: "<" }
]

const visitedPosition = new Set()

export async function day6() {

    const data = await readInputFile("/src/day6/input.txt");
    const input = data.split("\n")

    let currentPos
    let currentDirection

    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            for(const value of directions ) {
                if (input[i][j] === value.symbol) {
                    currentPos = [i, j]
                    currentDirection = findDirectionBySymbol(value.symbol)

                    addToSet(i, j)
                    break
                }
            }
        }
    }

    while(currentPos) {
        const [nextX, nextY] = nextPosition(currentPos[0], currentPos[1], currentDirection as number);

        // If next position would be out of bounds, stop
        if (!checkBounds(nextX, nextY, input)) {
            break;  // Guard would leave the map
        }

        if(isValidPosition(nextX, nextY, input)) {
            currentPos = [nextX, nextY];
            addToSet(nextX, nextY);
        } else {
            currentDirection = ((currentDirection as number) + 1) % 4;
        }
    }
    console.log("total visited ", visitedPosition.size);

}

function checkBounds(xCord: number, yCord: number, input: string[]) {
    if (xCord >= 0 && xCord < input.length && yCord >= 0 && yCord < input[xCord].length) {
        return true;
    }
    return false;
}

function isValidPosition(xCord: number, yCord: number, input: string[]) {

    if(!checkBounds(xCord, yCord, input)) {
        return false;
    }

    if (input[xCord][yCord] === "#") {
        return false
    }

    return true
}

function findDirectionBySymbol(dir: string) {
    for (let i = 0; i < directions.length; i++) {
        if (directions[i].symbol === dir) {
            return i
        }
    }
}

function currentIndexdDirection(dir: number) {
    return directions[(dir + 1) % 4];
}

function convertToString(x:number, y: number) {
    return `${x} ${y}`;
}

function addToSet(x: number, y: number) {
    const pos = convertToString(x,y)
    visitedPosition.add(pos);
}

function checkExistPos(pos: string) {
    return visitedPosition.has(pos);
}

function nextPosition(x:number, y:number, directionIndex: number) {
    const vector = directions[directionIndex].vector;

    return [x + vector[0], y + vector[1]];
}