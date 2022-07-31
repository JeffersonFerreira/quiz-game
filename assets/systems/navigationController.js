class NavigationController {
    constructor() {
        this.cardQuiz = document.querySelector(".card-quiz")
        this.cardStart = document.querySelector(".card-start")
        this.cardHighscores = document.querySelector(".card-highscores")
        this.cardFinalResults = document.querySelector(".card-final-results")
    }

    getElements() {
        return [
            this.cardStart,
            this.cardQuiz,
            this.cardFinalResults,
            this.cardHighscores
        ]
    }

    show(stepIndex) {
        if (stepIndex < 0 || stepIndex > 4)
            return

        const allCards = this.getElements();
        this._setVisibility(allCards[stepIndex], true)
    }

    _setVisibility(element) {
        this.getElements().forEach(el => {
            if (element !== el)
                el.setAttribute('hidden', "true")
            else
                el.removeAttribute('hidden')
        })
    }
}