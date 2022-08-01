class QuizController {

    constructor() {
        this.titleLabel = document.querySelector('.quiz-title')
        this.optionList = document.querySelector('.quiz-option-list')
        this.itemTemplate = document.querySelector('#quiz-option-template')
    }

    promptUser(title, options, correctOptionIndex){

        this.titleLabel.innerHTML = title
        this.optionList.replaceChildren()

        for (let i = 0; i < options.length; i++) {
            this.optionList.appendChild(this.itemTemplate.content.cloneNode(true))

            const element = this.optionList.children[i];

            element.innerHTML = options[i]
            element.addEventListener('click', e => {

                console.log("answer clicked")
            })
        }
    }

    showIsAnswerIsValid(isValid){
        const answerContainer = document.querySelector('.answer-state');
        const answerLabel = document.querySelector('.answer-value');

        answerContainer.removeAttribute('hidden')
        answerLabel.innerHTML = isValid ? 'Correct!' : 'Incorrect!'
    }
}