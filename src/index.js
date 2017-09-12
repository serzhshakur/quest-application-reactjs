import React from 'react'
import ReactDOM from 'react-dom'
import Question from './components/Question.js'
import AnswerForm from './components/AnswerForm.js'
import HintContainer from './components/HintContainer.js'
import PenaltiesContainer from './components/PenaltiesContainer.js'
import styles from './styles/styles.css'
import { postAnswer, fetchPenaltiesState } from './api/api.js'


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            question: '',
            answer: '',
            isAnswerCorrect: true,
            currentQuestion: 0,
            wrongAnswers: 0,
            hintRetrievals: 0
        }
    }

    onInput(e) {
        this.setState({ answer: e.target.value })
    }

    submitAnswer(e, callback) {
        e.preventDefault();
        postAnswer(this.state.answer).then(response => this.setState(
            {
                wrongAnswers: response.wrongAnswers,
                currentQuestion: response.currentQuestion,
                isAnswerCorrect: response.isCorrect
            }
        ))
    }

    updatePenaltiesState(source) {
        this.setState({
            wrongAnswers: source.wrongAnswers,
            hintRetrievals: source.hintRetrievals
        })
    }

    updateHintRetrievals(number) {
        this.setState({ hintRetrievals: number })
    }

    componentDidMount() {
        fetchPenaltiesState().then(response => this.updatePenaltiesState(response))
    }

    render() {
        return (
            <div id='questions-section'>
                <h1 id='sticky-title'>Квест</h1>
                <Question currentQuestion={this.state.currentQuestion} />
                <AnswerForm
                    currentQuestion={this.state.currentQuestion}
                    isAnswerCorrect={this.state.isAnswerCorrect}
                    onInput={this.onInput.bind(this)}
                    submitAnswer={this.submitAnswer.bind(this)}
                />
                <HintContainer updateHintRetrievals={this.updateHintRetrievals.bind(this)} />
                <PenaltiesContainer wrongAnswers={this.state.wrongAnswers} hintRetrievals={this.state.hintRetrievals} />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("app"))