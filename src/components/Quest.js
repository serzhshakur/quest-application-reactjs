import React from 'react'
import ReactDOM from 'react-dom'
import Question from './Question.js'
import AnswerForm from './AnswerForm.js'
import HintContainer from './HintContainer.js'
import PenaltiesContainer from './PenaltiesContainer.js'
import { postAnswer, fetchPenaltiesState, fetchQuestion } from '../api/api.js'
import { Redirect } from 'react-router-dom'
import styles from '../styles/styles.css'


class Quest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            question: {},
            answer: '',
            isAnswerCorrect: true,
            questionNumber: 0,
            wrongAnswers: 0,
            hintRetrievals: 0,
            isEnd: false
        }
    }

    updateQuestion() {
        fetchQuestion()
            .then(response => this.setState(
                {
                    isEnd: response.isEnd,
                    question: response.question,
                    wrongAnswers: response.wrongAnswers,
                    hintRetrievals: response.hintRetrievals
                }
            ))
    }

    onInput(e) {
        this.setState({ answer: e.target.value })
    }

    submitAnswer(e) {
        e.preventDefault();
        postAnswer(this.state.answer).then(response => {
            this.setState(
                {
                    wrongAnswers: response.wrongAnswers,
                    questionNumber: response.questionNumber,
                    isAnswerCorrect: response.isCorrect
                }
            )
            if (response.isCorrect) {
                this.updateQuestion()
            }
        })
    }

    updateHintRetrievals(number) {
        this.setState({ hintRetrievals: number })
    }

    componentDidMount() {
        this.updateQuestion()
    }

    render() {
        return this.state.isEnd ? (<Redirect to='/finish' />) : (
            <div id='questions-section'>
                <Question question={this.state.question} />
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