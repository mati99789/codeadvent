import {readFile} from 'fs/promises';
import { dirname, join } from 'node:path';
import {fileURLToPath} from "node:url";


const __dirname = dirname("");

export async function readInputFile(path: string): Promise<string> {
    try {
        return  await readFile(join(__dirname, path), 'utf8');
    } catch (e) {
        console.error("Error reading the file ", e);
        return Promise.reject(e);
    }
}


