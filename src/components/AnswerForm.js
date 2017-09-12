import React from 'react'
import styles from '../styles/answerInput.css'

class AnswerForm extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            isInputActive: false
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (
            nextProps.currentQuestion > this.props.currentQuestion
            || nextProps.isAnswerCorrect !== this.props.isAnswerCorrect
            || nextState.isInputActive !== this.state.isInputActive
        ) { return true }
        return false
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentQuestion > this.props.currentQuestion) {
            this.refs.answerInput.value = ''
        }
    }

    submit(e) {
        this.props.submitAnswer(e)
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
                <button onClick={this.submit.bind(this)} id='submit'>Проверить</button>
            </form>
        )
    }
}

export default AnswerForm;