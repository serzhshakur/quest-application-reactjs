import React from 'react'
import ReactDOM from 'react-dom'
import Question from './Question.js'
import AnswerForm from './AnswerForm.js'
import HintContainer from './HintContainer.js'
import PenaltiesContainer from './PenaltiesContainer.js'
import { postAnswer, fetchPenaltiesState } from '../api/api.js'
import { Redirect } from 'react-router-dom'
import styles from '../styles/styles.css'


class Quest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            question: '',
            answer: '',
            isAnswerCorrect: true,
            questionNumber: 0,
            wrongAnswers: 0,
            hintRetrievals: 0,
            isLastQuestion: false
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
                questionNumber: response.questionNumber,
                isAnswerCorrect: response.isCorrect,
                isLastQuestion: response.isLastQuestion
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
        return this.state.isLastQuestion ? (<Redirect to='/finish' />) : (
            <div id='questions-section'>
                <Question questionNumber={this.state.questionNumber} />
                <AnswerForm
                    questionNumber={this.state.questionNumber}
                    isAnswerCorrect={this.state.isAnswerCorrect}
                    onInput={this.onInput.bind(this)}
                    submitAnswer={this.submitAnswer.bind(this)}
                />
                <HintContainer questionNumber={this.state.questionNumber} updateHintRetrievals={this.updateHintRetrievals.bind(this)} />
                <PenaltiesContainer wrongAnswers={this.state.wrongAnswers} hintRetrievals={this.state.hintRetrievals} />
            </div>
        )
    }
}

export default Quest;