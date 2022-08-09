import ScoreboardManager from "./scoreboardManager";

export enum Page {
	Start, Quiz, SetScore, Leaderboard
}

export default class NavigationController {
	private readonly cardQuiz: Element;
	private readonly cardStart: Element;
	private readonly cardSetScore: Element;

	private readonly leaderboard: ScoreboardManager;

	constructor(leaderboard: ScoreboardManager) {
		this.leaderboard = leaderboard

		this.cardQuiz = document.querySelector(".card-quiz")
		this.cardStart = document.querySelector(".card-start")
		this.cardSetScore = document.querySelector(".card-final-results")
	}

	private getElements() {
		return [
			this.cardQuiz,
			this.cardStart,
			this.cardSetScore
		]
	}

	show(page: Page) {
		switch (page) {
			case Page.Quiz:       	this.setVisibility(this.cardQuiz);         break;
			case Page.Start:      	this.setVisibility(this.cardStart);        break;
			case Page.SetScore:			this.setVisibility(this.cardSetScore);		 break;

			case Page.Leaderboard: {
				this.setVisibility(null)
				this.leaderboard.show()
				break
			}
		}
	}

	private setVisibility(element?: Element) {
		this.leaderboard.hide()

		this.getElements()
			.forEach(el => {
				if (element === el)
					el.removeAttribute('hidden')
				else
					el.setAttribute('hidden', "true")
			})
	}
}