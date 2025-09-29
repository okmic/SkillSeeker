import { Bot, Context, session } from 'grammy'
import dotenv from 'dotenv'
import { SessionData } from './types'
import { ErrorTelegramStopExecution } from '../errors/errors'
import telegramCommandsController from './controllers/telegram.commands.controller'
import telegramActionsController from './controllers/telegram.actions.controller'
import telegramMiddleware from "./middleware/telegram.middleware.service"

dotenv.config()

class TGBot {
  
  private bot: Bot<Context>

  constructor(token: string) {
    this.bot = new Bot(token)
    this.initialize()
  }

  private async initialize() {
    try {
      const initSession: SessionData = {
        userAction: {}
        }
  
      this.bot.use(session({
        initial: () => (initSession) 
      }))
  
      this.bot.use(telegramMiddleware.authMiddleWare)
      this.bot.use(telegramMiddleware.menuMiddleWare)
      
      await new telegramCommandsController(this.bot).handleCommands()
      await new telegramActionsController(this.bot).handleActions()

    } catch (e) {
      if (e instanceof ErrorTelegramStopExecution) console.log("executed stop")
    }
  }

  public start() {
    this.bot.start()
  }

}

export default TGBot
