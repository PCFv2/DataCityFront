type Question = {
    userId?: string
    question: string
    choices: {
        choice1: {
            value: string,
            isTrue: boolean,
        },
        choice2: {
            value: string,
            isTrue: boolean,
        },
        choice3: {
            value: string,
            isTrue: boolean,
        }
    }
}