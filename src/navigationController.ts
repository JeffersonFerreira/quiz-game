enum Page {
	Start, Quiz, GameOver, Highscores
}

class NavigationController {
	private readonly cardQuiz: Element;
	private readonly cardStart: Element;
	private readonly cardHighscores: Element;
	private readonly cardFinalResults: Element;

	constructor() {
		this.cardQuiz = document.querySelector(".card-quiz")
		this.cardStart = document.querySelector(".card-start")
		this.cardHighscores = document.querySelector(".card-highscores")
		this.cardFinalResults = document.querySelector(".card-final-results")
	}

	getElements() {
		return [
			this.cardStart,
			this.cardQuiz,
			this.cardFinalResults,
			this.cardHighscores
		]
	}

	show(page: Page) {
		switch (page) {
			case Page.Quiz:       this._setVisibility(this.cardQuiz);         break;
			case Page.Start:      this._setVisibility(this.cardStart);        break;
			case Page.GameOver:   this._setVisibility(this.cardFinalResults); break;
			case Page.Highscores: this._setVisibility(this.cardHighscores);   break;
		}
	}

	_setVisibility(element: Element) {
		this.getElements().forEach(el => {
			if (element !== el)
				el.setAttribute('hidden', "true")
			else
				el.removeAttribute('hidden')
		})
	}
}