import fs from "fs/promises"
import dotenv from "dotenv"
import { join } from "path"
dotenv.config()

export async function storageChecked(dirPath: string) {
    try {
        await fs.access(dirPath)
    } catch (e) {
        await fs.mkdir(dirPath, { recursive: true })
    }
}

export type TGetPath = "storage"

export function getPath(storageType?: TGetPath) {
    
    const storPath = join(__dirname, "..", "..", "storage") 

    switch(storageType) {
        case "storage": return storPath
        default: throw new Error("invalid key")
    }
}

