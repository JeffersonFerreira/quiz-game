import {questions} from "./questions";

import Timer from "./timer";
import QuizController from "./quizController";
import NavigationController, {Page} from "./navigationController";
import ScoreboardManager from "./scoreboardManager";
import SetScoreController from "./SetScoreController";

type Callback = () => void
type Dispose = Callback | void
type GameState = (next?: Callback, fail?: Callback) => Dispose

Timer.resetUI()
const scoreboardManager = new ScoreboardManager();
const navigation = new NavigationController(scoreboardManager);
const setScoreController = new SetScoreController(scoreboardManager)

const showScoreboardButton = document.querySelector<HTMLButtonElement>("#leaderboard")

// showScoreboardButton.toggleAttribute("disabled", true)

// let gameStated = false
//
// document
// 	.querySelector("#leaderboard")
// 	.addEventListener("click", () => {
// 		if (!gameStated)
// 			leaderboard.show()
// 	})
//
// stateInit(() => {
// 	gameStated = true
// 	stateQuizGame(() => {
// 			navigation.show(Page.FinalResults)
// 		},
// 		() => {
// 			navigation.show(Page.FinalResults)
// 		}
// 	)
// })


const gameStates: Record<string, GameState> = {
	init: (next) => {
		navigation.show(Page.Start)
		const startQuizButton = document.querySelector<HTMLButtonElement>('#button-start-quiz');

		startQuizButton.addEventListener('click', next)

		return () => startQuizButton.removeEventListener('click', next)
	},
	game: (next) => {
		navigation.show(Page.Quiz)

		let questionIndex = -1;
		const timer = new Timer({onStop: next})
		const quizController = new QuizController({onOptionSelected})

		nextQuestion()
		timer.start(50)

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
			} else if (hasNextQuestion()) {
				nextQuestion()
			} else {
				next()
			}
		}

		return () => timer.stop()
	},
	setScore: next => {
		setScoreController.setUserScore(42)
		navigation.show(Page.SetScore)

		setScoreController.callbacks.onSubmit = () => next()
		return () => {
			setScoreController.callbacks.onSubmit = undefined
		}
	},
	leaderboard: (next) => {
		navigation.show(Page.Leaderboard)
	}
}

let stateIndex = 1
let dispose: Dispose = undefined

function nextState() {
	const keys = Object.keys(gameStates);
	const stateKey = keys[++stateIndex % keys.length]

	const newState = gameStates[stateKey];

	if (dispose)
		dispose()

	dispose = newState(nextState)
}

nextState()

// showScoreboardButton.addEventListener("click", () => {
// 	if (!leaderboard.isVisible)
// 		leaderboard.show()
// 	else
// 		leaderboard.hide()
// })