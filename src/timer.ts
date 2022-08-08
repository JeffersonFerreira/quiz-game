interface TimerCallbackOptions {
	onTick?: (totalSecondsRemain: number) => void
	onStop?: () => void
}

export default class Timer {
	private readonly callbacks: TimerCallbackOptions;
	private readonly timerLabel: Element;

	private durationSec: number;
	private intervalId: number;

	constructor(callbacks: TimerCallbackOptions) {
		this.callbacks = callbacks
		this.timerLabel = document.querySelector("#timer-value")
	}

	start(durationSec: number) {
		this.durationSec = durationSec

		const handler = () => {
			this.reduce(1);
			this.callbacks.onTick?.(this.durationSec)
            this.draw()
			if (this.durationSec <= 0) {
				this.stop()
			}
		};
		this.intervalId = window.setInterval( handler, 1000)
	}

	reduce(seconds: number) {
		this.durationSec = Math.max(0, this.durationSec - seconds)
        this.draw()
	}

	stop() {
		clearInterval(this.intervalId)
		this.callbacks.onStop?.()

		this.intervalId = undefined
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