import React from 'react'
import Question from './Question.js'
import AnswerForm from './AnswerForm.js'
import HintContainer from './HintContainer.js'
import PenaltiesContainer from './PenaltiesContainer.js'
import { postAnswer, fetchQuestion } from '../api/api.js'
import { Redirect } from 'react-router-dom'
import styles from '../styles/styles.css'
import inputStyles from '../styles/input.css'

export default class extends React.Component {
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

    componentDidUpdate(prevProps, prevState) {
        if (prevState.questionNumber < this.state.questionNumber) {
            window.scrollTo(0, 0)
        }
    }

    updateQuestion() {
        fetchQuestion()
            .then(response => this.setState(
                {
                    isEnd: response.isEnd,
                    text: response.text,
                    images: response.images,
                    wrongAnswers: response.wrongAnswers,
                    hintRetrievals: response.hintRetrievals
                }
            ))
    }

    onInput(answer) {
        this.setState({ answer })
    }

    submitAnswer(e) {
        return postAnswer(this.state.answer).then(response => {
            const isAnswerCorrect = response.questionNumber > this.state.questionNumber;
            this.setState(
                {
                    isAnswerCorrect: isAnswerCorrect,
                    questionNumber: response.questionNumber,
                    wrongAnswers: response.wrongAnswers
                }
            )
            if (isAnswerCorrect) {
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
            <div className='light-page'>
                <Question text={this.state.text} images={this.state.images} />
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