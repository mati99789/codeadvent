import {readInputFile} from "../utils/readFile.js";

export const day2 = async () => {
    const data = await readInputFile('./src/day2/input.txt');
    const processedData = data.trim().split('\n').map((line) =>
        line.trim().split(/\s+/).map(Number)
    );

    let safeReports = 0;

    for (const report of processedData) {
        if (isSequenceSafe(report)) {
            safeReports++;
            continue;
        }

        let canBeMadeSafe = false;
        for (let i = 0; i < report.length; i++) {
            const modifiedReport = [...report.slice(0, i), ...report.slice(i + 1)];
            if (isSequenceSafe(modifiedReport)) {
                canBeMadeSafe = true;
                break;
            }
        }

        if (canBeMadeSafe) {
            safeReports++;
        }
    }

    console.log(safeReports);
}

const isSequenceSafe = (report:number[]) => {
    const isIncreasing = report[0] < report[1];

    for (let i = 0; i < report.length - 1; i++) {
        const current = report[i];
        const next = report[i + 1];
        const diff = next - current;
        const absDiff = Math.abs(diff);

        if (absDiff === 0 || absDiff > 3) return false;

        if (isIncreasing && diff <= 0) return false;
        if (!isIncreasing && diff >= 0) return false;
    }

    return true;
}