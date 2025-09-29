import { Bot } from "grammy"
import { MyContext } from "../../types"
import { ErrorTelegramStopExecution } from "../../../errors/errors"

export default class AdminTelegramButtonsActionService {

    bot: Bot<MyContext>

    constructor(bot) {
        this.bot = bot
    }

    handleButtons() {
        try {
            
            this.bot.on("callback_query", async (ctx, next) => {
                try {
                } catch (e) {
                    if(e instanceof ErrorTelegramStopExecution) return
                    throw e
                }
            })
            
        } catch (e) {
            console.error(e)
        }
    }

}