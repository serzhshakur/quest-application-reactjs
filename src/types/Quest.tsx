export type QuestQuestion = {
    text: string,
    answer: string,
    hint: string,
    images?: string[],
    __id: string,
}

export type Quest = {
    name: string,
    id: string,
    finalWords: string,
    intro: string,
    isTeamNameRequired: boolean,
    showDonationSection: boolean,
    isPhoneRequired: boolean,
    isCodeRequired?: boolean,
    questions: QuestQuestion[]
}
