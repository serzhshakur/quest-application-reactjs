import React, {PureComponent} from 'react'
import {Redirect} from 'react-router-dom'
import {fetchQuest, fetchSessions} from '../api/apiAdmin'
import {calculateTime} from '../utils/timeUtils'

export default class extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            questName: '',
            questId: '',
            sessions: [],
            shouldRedirectBack: false
        }
    }

    componentDidMount() {
        fetchQuest(this.props.match.params.questId)
            .then(({name, id}) => this.setState({questName: name, questId: id}))

        fetchSessions(this.props.match.params.questId)
            .then(sessions => this.setState({sessions: sessions}))
    }

    goBack() {
        this.setState({shouldRedirectBack: true});
    }

    render() {
        const {shouldRedirectBack, questName, questId} = this.state;

        return (
            <div className='admin-page'>

                {shouldRedirectBack && <Redirect to='/admin'/>}
                <h1>{questName}</h1>
                <h2>Quest id: {questId}</h2>
                {this.state.sessions.map(session => {
                    const {name, wrongAnswers, hintRetrievals, createdDate, finishedDate, time} = session
                    const {hours, minutes, seconds} = calculateTime(time)
                    return <div key={session.created}>
                        <div>--------------------------------</div>
                        <p>Team name: <b>{name}</b></p>
                        <p>Created: <b>{createdDate}</b></p>
                        <p>Finished: <b>{finishedDate || 'not finished yet'}</b></p>
                        <p>Wrong answers: <b>{wrongAnswers}</b></p>
                        <p>Hint retrievals: <b>{hintRetrievals}</b></p>
                        {finishedDate && (<p>Total time: <b>{`${hours}:${minutes}:${seconds}`}</b></p>)}
                    </div>
                })}
                < button className="admin-button" onClick={this.goBack.bind(this)}>{'<'}</button>

            </div>
        )
    }
}