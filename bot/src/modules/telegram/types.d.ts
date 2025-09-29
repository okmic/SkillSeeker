import { Context, SessionFlavor } from "grammy"

export type TTelegramOneTurnActions =  "tempAction"
export type TAdminTelegramInitDoActions = "chooseCreateSite" 

export interface SessionData {


  userAction: {
    [userId: string]: {
      key: TTelegramOneTurnActions
    }
  }

}


interface MyContext extends Context, SessionFlavor<SessionData> {
}