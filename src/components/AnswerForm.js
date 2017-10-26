import React from 'react'
import styles from '../styles/input.css'

class AnswerForm extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            isInputActive: false
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (
            nextProps.questionNumber > this.props.questionNumber
            || nextProps.isAnswerCorrect !== this.props.isAnswerCorrect
            || nextState.isInputActive !== this.state.isInputActive
        ) { return true }
        return false
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.questionNumber > this.props.questionNumber) {
            this.refs.answerInput.value = ''
        }
    }

    onFocus() {
        this.setState({ isInputActive: true })
    }
    
    onBlur() {
        this.setState({ isInputActive: false })
    }

    render() {
        const classToAppend = !this.props.isAnswerCorrect && !this.state.isInputActive ? 'incorrect' : '';
        return (
            <form>
                <input
                    ref='answerInput'
                    type='text'
                    onInput={this.props.onInput}
                    onFocus={this.onFocus.bind(this)}
                    onBlur={this.onBlur.bind(this)}
                    id='answer-input'
                    className={classToAppend}
                />
                <button onClick={this.props.submitAnswer} id='submit'>Проверить</button>
            </form>
        )
    }
}

export default AnswerForm;