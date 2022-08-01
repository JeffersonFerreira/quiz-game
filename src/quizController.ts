type OptionSelectedArgs = {optionIndex: number, isCorrect: boolean}
interface QuizCallbackOptions {
	onOptionSelected?: (args: OptionSelectedArgs) => void
}

class QuizController {
	private titleLabel: Element;
	private optionList: Element;
	private itemTemplate: HTMLTemplateElement;
	private callbacks: QuizCallbackOptions

	constructor(callbacks?: QuizCallbackOptions) {
		this.callbacks = callbacks ?? {}
		this.titleLabel = document.querySelector('.quiz-title')
		this.optionList = document.querySelector('.quiz-option-list')
		this.itemTemplate = document.querySelector('#quiz-option-template')
	}

	promptUser(title : string, options: string[], correctOptionIndex: number) {
		this.hideAnswerResult()

		this.titleLabel.innerHTML = title
		this.optionList.replaceChildren()

		for (let i = 0; i < options.length; i++) {
			this.optionList.appendChild(this.itemTemplate.content.cloneNode(true))

			const element = this.optionList.children[i] as HTMLButtonElement;

			element.innerHTML = options[i]
			element.addEventListener('click', (e) => {
				const isValid = i == correctOptionIndex;

				this.callbacks.onOptionSelected?.({optionIndex: i, isCorrect: isValid})
				this.showIsAnswerIsValid(isValid)
			})
		}
	}

	showIsAnswerIsValid(isValid: boolean) {
		const answerLabel = document.querySelector('.answer-value');
		const answerContainer = document.querySelector('.answer-state');

		answerContainer.removeAttribute('hidden')
		answerLabel.innerHTML = isValid ? 'Correct!' : 'Incorrect!'
	}

	hideAnswerResult() {
		document
			.querySelector('.answer-state')
			.setAttribute("hidden", "true")
	}
}