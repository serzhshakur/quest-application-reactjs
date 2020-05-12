import React, {useCallback, useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom'
import {fetchCodes, fetchQuest, fetchSessions, generateNewCode} from '../api/apiAdmin'
import {calculateTime} from '../utils/timeUtils'

export default (props) => {

    const {questId} = props.match.params
    const [questName, setQuestName] = useState('')
    const [questCodes, setQuestCodes] = useState([])
    const [sessions, setSessions] = useState([])
    const [shouldRedirectBack, setShouldRedirectBack] = useState(false)

    const newCodeHandler = useCallback(async () => {
        const response = await generateNewCode(questId)
        setQuestCodes(response.codes)
    })

    const fetchQuestHandler = useCallback(async () => {
        console.log(questId)
        const {name} = await fetchQuest(questId)
        setQuestName(name)
    }, [questId])

    const fetchCodesHandler = useCallback(async () => {
        const codes = await fetchCodes(questId)
        setQuestCodes(codes)
    })

    const fetchSessionsHandler = useCallback(async () => {
        const sessions = await fetchSessions(questId)
        setSessions(sessions)
    })

    useEffect(() => {
            fetchQuestHandler()
            fetchCodesHandler()
            fetchSessionsHandler()
        },
        [questId]
    )

    function goBack() {
        setShouldRedirectBack(true);
    }

    return (
        <div className='admin-page'>

            {shouldRedirectBack && <Redirect to='/admin'/>}
            <h1>{questName}</h1>
            <h2>Codes</h2>
            <table className="codes-table">
                <thead>
                <tr>
                    <th>Code</th>
                    <th>Is Given</th>
                </tr>
                </thead>
                <tbody>
                {questCodes.map(({code, isGiven}) => {
                        return (
                            <tr key={code}>
                                <td>{code}</td>
                                <td>{isGiven ? 'x' : '-'}</td>
                            </tr>
                        )
                    }
                )}

                </tbody>
                <tfoot>
                <tr>
                    <td colSpan="2">
                        <button
                            className="admin-button"
                            onClick={newCodeHandler}
                        >New code</button>
                    </td>
                </tr>
                </tfoot>
            </table>

            <h2>Statistics</h2>

            {sessions.map(session => {
                const {name, phone, questCode, wrongAnswers, hintRetrievals, createdDate, finishedDate, time, questionIndex} = session
                const {hours, minutes, seconds} = calculateTime(time)

                return (
                    <div className="stats" key={session.created}>
                        <h3>Team name: {name ? name : <i>unnamed</i>}</h3>

                        <div className="stat">
                            <span className="stat-name">Quest code: </span>
                            <span className="stat-value">{questCode}</span>
                        </div>

                        <div className="stat">
                            <span className="stat-name">Team phone: </span>
                            <span className="stat-value">{phone
                                ? <b>{phone}</b> :
                                <i>no phone provided</i>}
                                </span>
                        </div>

                        <div className="stat">
                            <span className="stat-name">Created: </span>
                            <span className="stat-value">{createdDate}</span>
                        </div>

                        <div className="stat">
                            <span className="stat-name">Finished: </span>
                            <span className="stat-value">{finishedDate ? finishedDate :
                                <i>not finished yet</i>}</span>
                        </div>

                        <div className="stat">
                            <span className="stat-name">Steps completed: </span>
                            <span className="stat-value">{questionIndex}</span>
                        </div>

                        <div className="stat">
                            <span className="stat-name">Wrong answers: </span>
                            <span className="stat-value">{wrongAnswers}</span>
                        </div>

                        <div className="stat">
                            <span className="stat-name">Hint retrievals: </span>
                            <span className="stat-value">{hintRetrievals}</span>
                        </div>

                        {finishedDate && (
                            <div className="stat">
                                <span className="stat-name">Total time:</span>
                                <span className="stat-value">{`${hours}:${minutes}:${seconds}`}</span>
                            </div>)
                        }
                        <div>--------------------------------</div>
                    </div>
                )
            })}
            <button className="admin-button" onClick={goBack}>{'<'}</button>

        </div>
    )
}