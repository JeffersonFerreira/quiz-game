import ScoreboardManager from "./scoreboardManager";

interface Callbacks {
	onSubmit?: () => void
}

export default class SetScoreController {

	public readonly callbacks: Callbacks = {}

	private readonly scoreForm: HTMLFormElement;
	private readonly userScoreLabel: HTMLSpanElement;
	private readonly initialsInput: HTMLInputElement;

	private userScore: number = 0
	private scoreManager: ScoreboardManager;

	constructor(scoreManager: ScoreboardManager) {
		this.scoreManager = scoreManager;

		this.scoreForm = document.querySelector<HTMLFormElement>(".card-final-results form")
		this.initialsInput = document.querySelector<HTMLInputElement>(".card-final-results #initials")
		this.userScoreLabel = document.querySelector<HTMLSpanElement>(".card-final-results #user-score")

		this.scoreForm.addEventListener("submit", (ev) => this.onFormSubmit(ev))
	}

	setUserScore(value: number) {
		this.userScore = value

		this.draw()
	}

	private draw() {
		this.userScoreLabel.innerHTML = this.userScore.toString()
	}

	private onFormSubmit(ev: SubmitEvent) {
		ev.preventDefault()

		this.scoreManager.add({
			name: this.initialsInput.value,
			value: this.userScore
		})

		this.callbacks.onSubmit?.()
	}
}