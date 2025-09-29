import { Bot } from "grammy"
import { MyContext } from "../../types"
import { ErrorTelegramStopExecution } from "../../../errors/errors"

export default class TelegramMessageActionService {

    bot: Bot<MyContext>
    errorWriteFtpValidMsg 
    successWriteFtpValidMsg 

    constructor(bot) {
        this.errorWriteFtpValidMsg = 'Произошла ошибка!'
        this.successWriteFtpValidMsg = 'Записал!'
        this.bot = bot
    }

    async handleMessage() {
        try {

            this.bot.on("msg", async (ctx, next) => {
                await this.handleStorageAction(ctx)

            })

        } catch (e) {
            if(e instanceof ErrorTelegramStopExecution) return
            console.error(e)
        }
    }

    async handleStorageAction(ctx: MyContext): Promise<void> {
        try {
            if(ctx.session.userAction[ctx.from.id]) return
            const key = ctx.session.userAction[ctx.from.id].key
            switch (key) {
                case "tempAction":
                    if(ctx.message.text) {
                        await ctx.reply("Действие над событием")
                        throw new ErrorTelegramStopExecution()
                    }
                    throw new ErrorTelegramStopExecution()
                    default:
                    break
            }

        } catch (e) {
            throw new ErrorTelegramStopExecution()
        }
    }

}