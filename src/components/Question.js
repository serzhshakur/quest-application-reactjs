import React from 'react'
import { fetchQuestion } from '../api/api.js'

class Question extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            question: ""
        }
    }

    componentWillMount() {
        this.updateQuestion()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentQuestion > this.props.currentQuestion) {
            this.updateQuestion()
        }
    }

    updateQuestion() {
        fetchQuestion().then(response => this.setState({ question: response.question }))
    }

    render() {
        return <div id='question'>{this.state.question.text}</div>
    }
}

export default Question;