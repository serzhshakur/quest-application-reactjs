import React from 'react'
import styles from '../styles/input.css'

class AnswerForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            shouldUpdateIncorrectState: true
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.questionNumber > this.props.questionNumber) {
            this.refs.answerInput.value = ''
        }
    }

    onInput(e) {
        this.setState({ shouldUpdateIncorrectState: false });
        this.props.onInput(e.target.value);
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.submitAnswer()
            .then(() => this.setState({ shouldUpdateIncorrectState: true }));
    }

    render() {
        const isIncorrect = !this.props.isAnswerCorrect && this.state.shouldUpdateIncorrectState;
        const classToAppend = isIncorrect ? 'incorrect' : '';
        const errorMessage = isIncorrect ? 'Ответ невереный' : ''
        return (
            <form>
                <input
                    ref='answerInput'
                    type='text'
                    onInput={this.onInput.bind(this)}
                    id='answer-input'
                    className={classToAppend}
                />
                <p className='input-error-message'>{errorMessage}</p>
                <button onClick={this.onSubmit.bind(this)} className='submit'>Проверить</button>
            </form>
        )
    }
}

export default AnswerForm;