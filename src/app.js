const timer = new Timer({
	onStop: () => handleGameTimeout()
})

const navigation = new NavigationController();

function handleGameTimeout() {
	console.log("time fucking out...")
}

navigation.show(Page.Quiz)


const quizController = new QuizController({
	onOptionSelected: ({isCorrect}) => {
		if (isCorrect && hasNextQuestion()) {
			nextQuestion()
		}
	}
})

let questionIndex = -1;
nextQuestion()

function nextQuestion() {
	const question = questions[++questionIndex];

	const answerIndex = question.options.indexOf(question.answer);
	quizController.promptUser(question.questionText, question.options, answerIndex)
}

function hasNextQuestion(){
 return questionIndex + 1 < questions.length
}