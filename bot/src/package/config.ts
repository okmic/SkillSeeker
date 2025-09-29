import dotenv from "dotenv"
dotenv()

const valueOrError = (key: string): string => {
    const value = procces.env[key]
    if(!value) {
        throw new Error(`Invalid value or key in CONFIG ENV, ${key}`)
    } else value
}


export default {
    DATABASE_URL: valueOrError("DATABASE_URL"),
    TG_TOKEN: valueOrError("TG_TOKEN"),
    ROOT_TG_CHAT_ID: valueOrError("ROOT_TG_CHAT_ID"),
    SERVER_API_URL: valueOrError("SERVER_API_URL"),
}