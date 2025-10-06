import { config } from "dotenv"
config()

function valueOrError<T = string>(key: string): T {
    const value = process.env[key] as T
    if (!value) {
        throw new Error(`Invalid value or key in CONFIG ENV, ${key}`)
    } else return value
}


export default {
    DB: {
        dbName: valueOrError("DATABASE_NAME"),
        host: valueOrError("DATABASE_HOST"),
        port: Number(valueOrError("DATABASE_PORT")),
        user: valueOrError("DATABASE_USER"),
        password: valueOrError("DATABASE_PASSWORD"),
    },
    TG_TOKEN: valueOrError("TG_TOKEN"),
    ROOT_TG_CHAT_ID: valueOrError("ROOT_TG_CHAT_ID"),
    SERVER_API_URL: valueOrError("SERVER_API_URL"),
}