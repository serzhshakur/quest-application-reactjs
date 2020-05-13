import React, {useCallback, useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom'
import {fetchQuest, fetchSessions} from '../api/apiAdmin'
import {calculateTime} from '../utils/timeUtils'
import QuestCodesTable from "./QuestCodesTable";
import StatsItem from "./StatsItem";

export default ({match: {params: {questId}}}) => {

    const [questName, setQuestName] = useState('')
    const [sessions, setSessions] = useState([])
    const [shouldRedirectBack, setShouldRedirectBack] = useState(false)

    const fetchQuestHandler = useCallback(async () => {
        const {name} = await fetchQuest(questId)
        setQuestName(name)
    }, [questId])

    const fetchSessionsHandler = useCallback(async () => {
        const sessions = await fetchSessions(questId)
        setSessions(sessions)
    })

    useEffect(() => {
            fetchQuestHandler()
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

            <QuestCodesTable questId={questId}/>

            <h2>Статистика</h2>

            {sessions.map(session => {
                const {name, phone, questCode, wrongAnswers, hintRetrievals, createdDate, finishedDate, time, questionIndex} = session
                const {hours, minutes, seconds} = calculateTime(time)

                return (
                    <div className="stats" key={session.created}>
                        <h3>Имя команды: {name ? name : <i>unnamed</i>}</h3>

                        <StatsItem name="Код: " value={questCode}/>
                        <StatsItem name="Телефон: " value={phone}/>
                        <StatsItem name="Дата начала: " value={createdDate}/>
                        <StatsItem
                            name="Закончен: "
                            value={finishedDate ? finishedDate : <i>еще не закончен</i>}
                        />
                        <StatsItem name="Пройдено шагов: " value={questionIndex}/>
                        <StatsItem name="Неверных ответов: " value={wrongAnswers}/>
                        <StatsItem name="Получено подсказок: " value={hintRetrievals}/>
                        {finishedDate && (
                            <StatsItem
                                name="Общее время прохождения: "
                                value={`${hours}:${minutes}:${seconds}`}
                            />
                        )
                        }
                        <div>--------------------------------</div>
                    </div>
                )
            })}
            <button className="admin-button" onClick={goBack}>{'<'}</button>

        </div>
    )
}