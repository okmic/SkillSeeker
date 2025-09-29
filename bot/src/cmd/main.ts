import TGBot from "../modules/telegram/TGBot"
import { getPath, storageChecked } from '../package/helper'
import config from '../package/config'

try {
    const path2stor = getPath("storage")
    storageChecked(path2stor)

    console.log(`[SKILLSEEKER-BOT-STARTED-${new Date().toDateString()}] - success`)

    new TGBot(config.TG_TOKEN).start()
    
} catch (e) {
    console.error(`[ERROR-SKILLSEEKER-BOT-${new Date().toDateString()}] - ERROR`)
    console.error(e)
}

