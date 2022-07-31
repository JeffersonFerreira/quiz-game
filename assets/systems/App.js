const timerLabel = document.querySelector("#timer-value")

const timer = new Timer({
    onTick: time => timerLabel.innerHTML = Timer.format(time),
    onStop: () => handleGameTimeout()
})

const navigation = new NavigationController();

function handleGameTimeout() {
    console.log("time fucking out...")
}