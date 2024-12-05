import {readInputFile} from "../utils/readFile.js";


export async function day5() {
    const input = await readInputFile("/src/day5/input.txt");


    const [pages, update] = input.split("\n\n")

    const filteredPages = pages.split("\n").map(line => line.split("|").map(Number))
    const filteredUpdates = update.split('\n').map(line => line.trim().split(",")).map(item => item.map(Number))



    const validSequences = filteredUpdates.filter((seq) => {
        return filteredPages.every(([x, y]) => isValidSequence(x,y, seq))
    })


    const total = validSequences.reduce((acc, curr) => {
        const middle = curr[Math.floor(curr.length / 2)]

        return acc + middle
    }, 0)

    console.log(total)


}

function isValidSequence(x: number, y: number, sequences: number[]): boolean {
    if(!sequences) return false;

    for (let i = 0; i < sequences.length; i++) {
        const beforeIndex = sequences.indexOf(x)
        const afterIndex = sequences.indexOf(y)

        if(beforeIndex !== -1 && afterIndex !== -1) {
            if(beforeIndex > afterIndex) {
                return false;
            }
        }
    }

    return true
}