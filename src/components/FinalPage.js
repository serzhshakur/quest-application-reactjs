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

    calculateTime(secondsTotal) {
        const seconds = secondsTotal % 60;
        const minutesTotal = secondsTotal > 60 ? Math.floor(secondsTotal / 60) : 0;
        const hours = minutesTotal > 60 ? Math.floor(minutesTotal / 60) : 0;
        const minutes = hours > 0 ? minutesTotal % 60 : minutesTotal;

        const minutesString = `${minutes}`.padStart(2, "0");
        const secondsString = `${seconds}`.padStart(2, "0");
        return { hours, minutes: minutesString, seconds: secondsString };
    }

    render() {
        const { wrongAnswers, hintRetrievals, time } = this.state.content;
        const { hours, minutes, seconds } = this.calculateTime(time);
        return (
            <div className="regular-page">
                <p>{this.state.content.finalWords}</p>
                <p class="bold-text">Твои результаты:</p>
                <p>Неверных ответов <span class="bold-text">{wrongAnswers}</span></p>
                <p>Количество подсказок <span class="bold-text">{hintRetrievals}</span></p>
                <p>Время выполнения <span class="bold-text">{`${hours}:${minutes}:${seconds}`}</span></p>
            </div>
        )
    }
}

export default FinalPage