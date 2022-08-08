import {questions} from "./questions";

import Timer from "./timer";
import QuizController from "./quizController";
import NavigationController, {Page} from "./navigationController";

Timer.resetUI()
const navigation = new NavigationController();

stateQuizGame(undefined, undefined)

// stateInit(null)
// stateQuizGame(() => {
// 	console.log("Quiz game completed")
// }, () => {
// 	console.log("Quiz game failed")
// })

function stateInit(next) {
	navigation.show(Page.Start)
	const startQuizButton = document.querySelector<HTMLButtonElement>('#button-start-quiz');

	startQuizButton.addEventListener('click', next)

	return () => {
		startQuizButton.removeEventListener('click', next)
	}
}

function stateQuizGame(next, onFail) {
	navigation.show(Page.Quiz)

	let questionIndex = -1;
	const timer = new Timer({onStop: onFail})
	const quizController = new QuizController({onOptionSelected})

	nextQuestion()
	timer.start(120)

	function hasNextQuestion() {
		return questionIndex + 1 < questions.length
	}

	function nextQuestion() {
		const question = questions[++questionIndex];

		const answerIndex = question.options.indexOf(question.answer);
		quizController.promptUser(question.questionText, question.options, answerIndex)
	}

	function onOptionSelected({isCorrect}) {
		if (!isCorrect) {
			timer.reduce(10)
		}
		else if (hasNextQuestion()) {
			nextQuestion()
		}
		else {
			next()
		}
	}

	return () => {
		timer.stop()
	}
}

function stateGameOver(next) {

}