﻿const KEY = "scoreboard";

type Score = { name: string, value: number }
interface Callbacks {
	onVisibilityChanged?: (isVisible) => void
}

export default class ScoreboardManager {

	get isVisible() {
		return !this.cardScoreboard.hasAttribute("hidden")
	}

	readonly callbacks: Callbacks

	private scoreList: Score[];
	private cardScoreboard: Element;

	private clearButton: HTMLButtonElement
	private closeButton: HTMLButtonElement

	constructor() {
		this.callbacks = {}
		this.scoreList = this.load()

		this.cardScoreboard = document.querySelector(".card-scoreboard")
		this.clearButton = document.querySelector(".card-scoreboard .button-clear")
		this.closeButton = document.querySelector(".card-scoreboard .button-close")

		this.closeButton.addEventListener("click", () => this.hide())
		this.clearButton.addEventListener("click", () => this.reset())
	}

	show() {
		if (!this.isVisible) {
			this.cardScoreboard.removeAttribute("hidden")

			this.draw()
			this.callbacks.onVisibilityChanged?.(true)
		}
	}

	hide() {
		if (this.isVisible) {
			this.cardScoreboard.setAttribute("hidden", "true")
			this.callbacks.onVisibilityChanged?.(false)
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

	private load() {
		const scoreJson = localStorage.getItem(KEY);

		return scoreJson
			? JSON.parse(scoreJson)
			: []
	}
}