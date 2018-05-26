import React from 'react'
import { fetchFinalWords } from '../api/api.js'

class FinalPage extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            content: {}
        }
    }

    componentDidMount() {
        fetchFinalWords().then(content => this.setState({ content }))
    }

    render() {
        return (
            <div className="regular-page">
                <p>{this.state.content.finalWords}</p>
                <p class="bold-text">Твои результаты:</p>
                <p>Неверных ответов <span class="bold-text">{this.state.content.wrongAnswers}</span></p>
                <p>Количество подсказок <span class="bold-text">{this.state.content.hintRetrievals}</span></p>
            </div>
        )
    }
}

export default FinalPage