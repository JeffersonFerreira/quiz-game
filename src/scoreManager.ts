const KEY = "scoreboard";

type Score = { name: string, value: number }
interface Callbacks {
	onVisibilityChanged?: (isVisible) => void
	onClear?: () => void
}

export default class ScoreManager {

	get isVisible() {
		return !this.cardScoreboard.hasAttribute("hidden")
	}

	readonly callbacks?: Callbacks

	private scoreList: Score[];
	private cardScoreboard: Element;

	private clearButton: HTMLButtonElement
	private closeButton: HTMLButtonElement

	constructor() {
		this.scoreList = []

		this.cardScoreboard = document.querySelector(".card-scoreboard")
		this.clearButton = document.querySelector(".card-scoreboard .button-clear")
		this.closeButton = document.querySelector(".card-scoreboard .button-close")

		this.closeButton.addEventListener("click", () => this.hide())
		this.clearButton.addEventListener("click", () => this.reset())

		this.load()
		this.show()
	}

	show() {
		if (!this.isVisible) {
			this.cardScoreboard.removeAttribute("hidden")
			this.draw()
		}
	}

	hide() {
		if (this.isVisible) {
			this.cardScoreboard.setAttribute("hidden", "true")
		}
	}

	add(score: Score) {
		this.scoreList.push(score)
		this.save()
	}

	getScores(): Readonly<Score[]> {
		return this.scoreList
	}

	reset() {
		this.scoreList.splice(0)
		localStorage.removeItem(KEY)
	}

	draw() {
		const list: HTMLOListElement = document.querySelector(".card-scoreboard .item-list")
		const template: HTMLTemplateElement = document.querySelector('#scoreboard-item-template')

		// Clear
		list.replaceChildren()

		// Draw
		this.getScores()
			.slice()
			.sort((a, b) => b.value > a.value ? 1 : -1)
			.forEach(({name, value}) => {
				list.appendChild(template.content.cloneNode(true))
				list.lastElementChild.innerHTML = `${name} - ${value}`
			})
	}

	save() {
		const scoreJson = JSON.stringify(this.scoreList)
		localStorage.setItem(KEY, scoreJson)
	}

	load() {
		const scoreJson = localStorage.getItem(KEY);

		if (scoreJson) {
			this.scoreList = JSON.parse(scoreJson)
		}
	}
}