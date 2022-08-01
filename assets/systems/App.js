const timerLabel = document.querySelector("#timer-value")

const timer = new Timer({
    onTick: time => timerLabel.innerHTML = Timer.format(time),
    onStop: () => handleGameTimeout()
})

const navigation = new NavigationController();

function handleGameTimeout() {
    console.log("time fucking out...")
}

navigation.show(1)


const quizController = new QuizController()

quizController.promptUser("This is a sample title", ["Option A", "Option B"], 2)