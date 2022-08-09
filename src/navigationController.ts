import ScoreManager from "./scoreManager";

export enum Page {
	Start, Quiz, FinalResults, Leaderboard
}

export default class NavigationController {
	private readonly cardQuiz: Element;
	private readonly cardStart: Element;
	private readonly cardScoreboard: Element;
	private readonly cardFinalResults: Element;

	constructor() {
		this.cardQuiz = document.querySelector(".card-quiz")
		this.cardStart = document.querySelector(".card-start")
		this.cardScoreboard = document.querySelector(".card-scoreboard")
		this.cardFinalResults = document.querySelector(".card-scoreboard")
	}

	getElements() {
		return [
			this.cardQuiz,
			this.cardStart,
			this.cardScoreboard,
			this.cardFinalResults
		]
	}

	show(page: Page) {
		switch (page) {
			case Page.Quiz:       	this.setVisibility(this.cardQuiz);         break;
			case Page.Start:      	this.setVisibility(this.cardStart);        break;
			case Page.Leaderboard: 	this.setVisibility(this.cardScoreboard);   break;
			case Page.FinalResults: this.setVisibility(this.cardFinalResults); break;
		}
	}

	private setVisibility(element: Element) {
		this.getElements()
			.forEach(el => {
				if (element === el)
					el.removeAttribute('hidden')
				else
					el.setAttribute('hidden', "true")
			})
	}
}