
export const telegramMenuMsgs = {
    about: "SkillSeeker 📝",
}

export const getAllWordExceptions = () => {

    const resultArrayExcWords = []

    for(let key in telegramMenuMsgs){
        resultArrayExcWords.push(telegramMenuMsgs[key])
    }

    return resultArrayExcWords

}