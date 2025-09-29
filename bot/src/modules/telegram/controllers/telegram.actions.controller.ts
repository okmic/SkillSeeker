import { Bot } from "grammy"
import { MyContext } from "../types"
import TelegramMessageActionService from "../services/actions/telegram.message.action.service"
import TelegramButtonsActionService from "../services/actions/telegram.buttons.action.service"

class TelegramActionsController {

    private bot: Bot<MyContext>

    constructor(bot) {
        this.bot = bot
    }

    async handleActions() {
      await new TelegramMessageActionService(this.bot).handleMessage()
      new TelegramButtonsActionService(this.bot).handleButtons()
    }

}

export default TelegramActionsController