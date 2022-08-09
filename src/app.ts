import {questions} from "./questions";

import Timer from "./timer";
import QuizController from "./quizController";
import NavigationController, {Page} from "./navigationController";
import ScoreboardManager from "./scoreboardManager";
import SetScoreController from "./SetScoreController";

type Callback = () => void
type Dispose = Callback | void
type GameState = (next?: Callback, fail?: Callback) => Dispose

const GAME_DURATION = 50
const GAME_INVALID_OPTION_PENALTY = 10

const timer = new Timer()
const scoreboardManager = new ScoreboardManager();
const navigation = new NavigationController(scoreboardManager);
const setScoreController = new SetScoreController(scoreboardManager)

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
		const quizController = new QuizController({onOptionSelected})

		nextQuestion()
		timer.start(GAME_DURATION)

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
				timer.reduce(GAME_INVALID_OPTION_PENALTY)
			} else if (hasNextQuestion()) {
				nextQuestion()
			} else {
				next()
			}
		}

		return () => timer.stop()
	},
	setScore: next => {
		setScoreController.setUserScore(parseInt((timer.seconds * 10 * Math.PI).toString()))
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

let stateIndex = -1
let disposeState: Dispose = undefined
const showScoreboardButton = document.querySelector<HTMLButtonElement>("#leaderboard")

startGame()

function startGame(){
	timer.resetUI()
	stateIndex = -1;

	nextState()
}

function nextState() {
	const keys = Object.keys(gameStates)

	const nextStateIndex = stateIndex + 1
	const stateKey = keys[nextStateIndex % keys.length]

	const isFirst = nextStateIndex % keys.length === 0
	const newState = gameStates[stateKey];

	if (disposeState)
		disposeState()

	if (isFirst)
		showScoreboardButton.removeAttribute("disabled")
	else
		showScoreboardButton.setAttribute("disabled", "true")

	stateIndex = nextStateIndex
	disposeState = newState(nextState)
}

scoreboardManager.callbacks.onVisibilityChanged = isVisible => {
	if (!isVisible)
		startGame()
}

showScoreboardButton.addEventListener("click", () => navigation.show(Page.Leaderboard))