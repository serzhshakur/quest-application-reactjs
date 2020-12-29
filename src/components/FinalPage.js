import React from 'react'
import {fetchFinalWords} from '../api/api.js'
import {calculateTime} from '../utils/timeUtils'
import ReactMarkdown from 'react-markdown';

class FinalPage extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            content: {}
        }
    }

    componentDidMount() {
        fetchFinalWords().then(content => this.setState({content}))
    }

    render() {
        const {wrongAnswers, hintRetrievals, time, name} = this.state.content;
        const {hours, minutes, seconds} = calculateTime(time);
        return (
            <div className="regular-page">
                <ReactMarkdown>{this.state.content.finalWords}</ReactMarkdown>
                {name && <p>Командa "<span className="bold-text">{name}</span>"</p>}
                <p className='bold-text'>Результаты:</p>
                <p>Неверных ответов <span className="bold-text">{wrongAnswers}</span></p>
                <p>Количество подсказок <span className="bold-text">{hintRetrievals}</span></p>
                <p>Время выполнения <span className="bold-text">{`${hours}:${minutes}:${seconds}`}</span></p>
            </div>
        )
    }
}

export default FinalPage
