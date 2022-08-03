const KEY = "scoreboard";

type Score = { name: string, value: number }

class ScoreManager {
	private scoreList: Score[];

	constructor() {
		this.scoreList = []
	}

	add(score: Score) {
		this.scoreList.push(score)
	}

	list(): Readonly<Score[]> {
		return this.scoreList
	}

	reset() {
		this.scoreList.splice(0)
		localStorage.removeItem(KEY)
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