const api = require('../localUserAPI')

const load = async (senderID, keys) => {
    const oldState = await api.getState(senderID)
    //contact that user for the first time
    if (oldState === null) {
        await api.setState(senderID, { state: "initial", done: 0, round: 0, keysLeftForThatUser: keys, welcomed: false, userScore: 0 })
    }
    let state = await api.getState(senderID)

    return new User(senderID, state)
}

class User {
    constructor(senderID, state) {
        this.senderID = senderID
        this.state = state
    }

    startQuiz(questionKey) {
        this.setState({
            keysLeftForThatUser: this.state.keysLeftForThatUser,
            currentQuestionKey: questionKey,
            done: this.state.done,
            round: this.state.round,
            state: 'playing',
            userScore: this.state.userScore
        })
    }

    setRound(round) {
        api.setRound(this.senderID, round)
        this.state.round = round
    }

    welcome() {
        api.setStateWelcome(this.senderID, true)
        this.state.welcomed = true
    }

    playing(keysLeftForThatUser) {
        api.setState(this.senderID,
            { state: 'playing', done: this.state.done, round: this.state.round, keysLeftForThatUser: this.state.keysLeftForThatUser, 
            welcomed: this.state.welcomed, userScore: this.state.userScore }
        )
        this.state.state = 'playing'
        this.state.welcomed = true
        this.state.keysLeftForThatUser = keysLeftForThatUser
    }

    pause() {
        api.setState(this.senderID,
            { state: 'pause', done: this.state.done, round: this.state.round, keysLeftForThatUser: this.state.keysLeftForThatUser, 
            welcomed: this.state.welcomed, userScore: this.state.userScore }
        )
        this.state.state = 'pause'
        this.state.welcomed = true
    }

    resume() {
        api.setState(this.senderID,
            { state: 'playing', done: this.state.done, round: this.state.round, keysLeftForThatUser: this.state.keysLeftForThatUser, 
            welcomed: this.state.welcomed, userScore: this.state.userScore }
        )
        this.state.state = 'playing'
    }

    finish() {
        api.setState(this.senderID,
            { state: 'finish', done: 0, round: this.state.round, keysLeftForThatUser: this.state.keysLeftForThatUser, 
            welcomed: this.state.welcomed, userScore: 0 }
        )
        this.state.state = 'finish'
        this.state.welcomed = true
    }

    nextRound(keysLeftForThatUser) {
        api.setState(this.senderID,
            { state: 'playing', done: 0, round: this.state.round, keysLeftForThatUser: keysLeftForThatUser, 
            welcomed: this.state.welcomed, userScore: 0 }
        )
        this.state.keysLeftForThatUser = keysLeftForThatUser
        this.state.state = 'playing'
        this.state.welcomed = true
    }
}

module.exports = { load }

