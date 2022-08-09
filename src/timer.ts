interface TimerCallbackOptions {
	onTick?: (totalSecondsRemain: number) => void
	onStop?: () => void
}

export default class Timer {
	get isTicking(): boolean {
		return !!this.intervalId
	}

	private readonly callbacks: TimerCallbackOptions;
	private readonly timerLabel: Element;

	private durationSec: number;
	private intervalId: number;

	constructor(callbacks: TimerCallbackOptions) {
		this.callbacks = callbacks
		this.timerLabel = document.querySelector("#timer-value")
	}

	start(durationSec: number) {
		const handler = () => {
			if (!this.intervalId)
				return

			this.reduce(1);
			this.callbacks.onTick?.(this.durationSec)

			if (this.durationSec <= 0) {
				this.stop()
			}
		};

		this.durationSec = durationSec
		this.intervalId = window.setInterval(handler, 1000)
		this.draw()
	}

	reduce(seconds: number) {
		this.durationSec = Math.max(0, this.durationSec - seconds)
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
		this.timerLabel.innerHTML = Timer.format(this.durationSec)
	}

	static resetUI() {
		document.querySelector('#timer-value').innerHTML = ""
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