import TGBot from "../modules/telegram/TGBot"
import { getPath, storageChecked } from '../package/helper'
import config from '../package/config'
import { setupGlobalErrorHandlers } from "../package/error-handler.init"
import mikroOrmConfig from "../package/mikro-orm.config"
import { MikroORM } from "@mikro-orm/mysql"
(async () => {
try {
    setupGlobalErrorHandlers()
    const path2stor = getPath("storage")
    storageChecked(path2stor)
    const orm = await MikroORM.init(mikroOrmConfig)
    await orm.getSchemaGenerator().createSchema();
    new TGBot(config.TG_TOKEN).start()
    console.log(`[SKILLSEEKER-BOT-STARTED-${new Date().toDateString()}] - success`)
} catch (e) {
    console.error(`[ERROR-SKILLSEEKER-BOT-${new Date().toDateString()}] - ERROR`)
    console.error(e)
}
})()