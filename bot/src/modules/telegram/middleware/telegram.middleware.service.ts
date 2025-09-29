import { NextFunction } from "grammy"
import { MyContext } from "../types"
import adminTelegramMenuService from "../services/admin.telegram.menu.service"
import { PrismaClient } from "@prisma/client"

class AdminTelegramMiddleware {

    async authMiddleWare(ctx: MyContext, next: NextFunction) {
        try {
            if(ctx.message && ctx.message.text && ctx.message.text === "/start") return await next()

            const chatId = ctx.from.id

            const prisma = new PrismaClient()

            let user = await prisma.user.findUnique({
                where: {
                    adminTgChatId: chatId.toString()
                },
            })

            let isAuth = false
            if(user && user.TariffStatus !== "FREE") isAuth = true

            if(!isAuth) return await ctx.reply(`Доброго времени суток ${ctx.from.first_name}\n\nК сожалению, ваша подписка не активна. Для активации доступа к боту, пожалуйста, обратитесь к менеджеру продукта в Telegram: @dev_okmic`)
            return await next()

        } catch (e) {
            return
        }
    }

    async menuMiddleWare(ctx: MyContext, next: NextFunction) {
        try {
            if (ctx.message && ctx.message.text) {
                const msg = ctx.message.text.toLowerCase().trim()
                
                if(
                    "/help" === msg ||
                    "help" === msg ||
                    "помощь" === msg ||
                    "/menu" === msg ||
                    "menu" === msg ||
                    "/меню" === msg ||
                    "меню" === msg
                ) {
                    return await ctx.reply(
                        'Меню'
                    ) 
                } else return await next()
           
            } else return await next()
        } catch (e) {
            return
        }
    }
}

export default new AdminTelegramMiddleware()