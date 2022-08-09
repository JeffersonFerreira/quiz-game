interface Callbacks {
	onTick?: (totalSecondsRemain: number) => void
	onStop?: () => void
}

export default class Timer {
	get isTicking(): boolean {
		return !!this.intervalId
	}

	get seconds() {
		return this._seconds
	}

	readonly callbacks: Callbacks = {}

	private readonly timerLabel: Element;

	private _seconds: number;
	private intervalId: number;

	constructor() {
		this.timerLabel = document.querySelector("#timer-value")
	}

	start(durationSec: number) {
		const handler = () => {
			if (!this.intervalId)
				return

			this.reduce(1);
			this.callbacks.onTick?.(this._seconds)

			if (this._seconds <= 0) {
				this.stop()
			}
		};

		this._seconds = durationSec
		this.intervalId = window.setInterval(handler, 1000)
		this.draw()
	}

	reduce(seconds: number) {
		this._seconds = Math.max(0, this._seconds - seconds)
		this.draw()
	}

	stop() {
		if (!this.isTicking)
			return

		window.clearInterval(this.intervalId)
		this.intervalId = undefined
		this.callbacks.onStop?.()
	}

	draw() {
		this.timerLabel.innerHTML = Timer.format(this._seconds)
	}

	resetUI() {
		this.timerLabel.innerHTML = ''
	}

	static format(time: number) {
		const minutes = parseInt((time / 60).toString())
		const seconds = parseInt((time - (minutes * 60)).toString())

		let minString = minutes.toString();
		let secString = seconds.toString();

		if (minutes < 10) {
			minString = '0' + minutes
		}

		if (seconds < 10) {
			secString = '0' + seconds
		}

		return `${minString}:${secString}`
	}
}