import { Bot } from "grammy"
import { MyContext } from "../types"
import { PrismaClient } from "@prisma/client"

class AdminTelegramCommandsController {

    private bot: Bot<MyContext>
    private prisma: PrismaClient

    constructor(bot) {
        this.bot = bot
        this.prisma = new PrismaClient()
    }

    async handleCommands() {
        this.bot.command('start', async (ctx) => await this.startCommand(ctx as MyContext))
    }

    private async startCommand(ctx: MyContext) {
        try {
            const findeUsersWithId = await this.prisma.user.findUnique({where: {adminTgChatId: ctx.from.id.toString()}})
            if(!findeUsersWithId) await this.prisma.user.create({
                data: {
                    adminTgChatId: ctx.from.id.toString(),
                    tgLogin: ctx.from.username || "unknown user"
                }
            })
            return await ctx.reply('Добро пожаловать в SkillSeeker!')
        } catch (e) {
            console.error(e)
        }
    }
}

export default AdminTelegramCommandsController