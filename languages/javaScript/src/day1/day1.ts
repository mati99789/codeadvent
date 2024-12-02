import {readInputFile} from "../utils/readFile.js";

export const day1 = async () => {
    const data = await readInputFile('../../input.txt');


    const processData = data
        .trim()
        .split('\n')
        .map((line) => line.trim().split(/\s+/).map(Number))

    const leftList = processData.map((row) => row[0]).sort((a, b) => a - b);
    const rightList = processData.map((row) => row[1]).sort((a, b) => a - b);

    let total = 0;

    for(let i = 0; i < leftList.length; i++) {
        let a= 0

        total += Math.abs(leftList[i] - rightList[i]);
    }

   let totalTwo = 0

    for (let i = 0; i < leftList.length; i++) {
        let count = 0
        for (let j = 0; j < rightList.length; j++) {
            if(leftList[i] === rightList[j] && leftList[i] != 0) {
                count++
            }
        }

        totalTwo += leftList[i] * count;
    }

    console.log(total)
    console.log(totalTwo);
}

