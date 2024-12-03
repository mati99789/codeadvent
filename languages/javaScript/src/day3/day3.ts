import {readInputFile} from "../utils/readFile.js";


export const day3 = async () => {
    const data = await readInputFile('./src/day3/input.txt')

    const pattern = /mul\((\d{1,3}),(\d{1,3})\)/g;

    const result = data.match(pattern);

    let total = 0
    if (result) {

        result.forEach((item) => {
            const input = item.replace("mul(", '').replace(")", "").split(',').map(Number);

            total += input[0] * input[1];
        })
    }


    partTwo()
}


const partTwo = async () => {
    const data = await readInputFile('./src/day3/input.txt')

    const pattern = /(mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\))/g;

    const result = Array.from(data.matchAll(pattern));


    let total = 0;
    let isEnabled = true;


    result.forEach((match) => {
        const completeMatch = match[0];  // This is what we called fullMatch

        if (completeMatch === 'do()') {
            isEnabled = true;
        } else if (completeMatch === "don't()") {
            isEnabled = false;
        } else if (isEnabled && completeMatch.startsWith('mul')) {
            const input = completeMatch.replace("mul(", '').replace(")", "").split(',').map(Number);
            total += input[0] * input[1];
        }
    })

    console.log(total)
}
