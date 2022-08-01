class Timer {

    constructor(callbacks) {
        this.callbacks = callbacks
    }

    start(durationSec) {

        const id = setInterval(function () {
            durationSec -= 1;
            this.callbacks.onTick?.(durationSec)

            if (durationSec <= 0) {
                clearInterval(id)
                this.callbacks.onStop?.()
            }
        }.bind(this), 1000)
    }

    static format(time) {
        const minutes = parseInt(time / 60)
        const seconds = parseInt(time - (minutes * 60))

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