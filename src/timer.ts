interface TimerCallbackOptions {
	onTick?: (totalSecondsRemain: number) => void
	onStop?: () => void
}

class Timer {
	private readonly callbacks: TimerCallbackOptions;
	private readonly timerLabel: Element;
	private intervalId: number;

	constructor(callbacks: TimerCallbackOptions) {
		this.callbacks = callbacks
		this.timerLabel = document.querySelector("#timer-value")
	}

	start(durationSec: number) {
		this.intervalId = setInterval(this._onTick, 1000)
	}

	_onTick(durationSec: number) {
		durationSec -= 1;

		this.timerLabel.innerHTML = Timer.format(durationSec)
		this.callbacks.onTick?.(durationSec)

		if (durationSec <= 0) {
			clearInterval(this.intervalId)
			this.callbacks.onStop?.()
		}
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