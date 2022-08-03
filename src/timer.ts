interface TimerCallbackOptions {
	onTick?: (totalSecondsRemain: number) => void
	onStop?: () => void
}

class Timer {
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
		this.intervalId = setInterval(this.onTick, 1000)
	}

	private onTick() {
		this.reduce(1);

		this.timerLabel.innerHTML = Timer.format(this.durationSec)
		this.callbacks.onTick?.(this.durationSec)

		if (this.durationSec <= 0) {
			this.stop()
		}
	}

	reduce(seconds: number) {
		this.durationSec = Math.max(0, this.durationSec - seconds)
	}

	stop() {
		clearInterval(this.intervalId)
		this.callbacks.onStop?.()

		this.intervalId = undefined
	}

	static resetUI() {
		document.querySelector('#timer-value').innerHTML = ""
	}

	static format(time: number) {
		const minutes = time / 60
		const seconds = time - (minutes * 60)

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