import React, {useCallback, useEffect, useState} from 'react'
import {fetchSessions} from '../api/apiAdmin'
import {calculateTime} from '../utils/timeUtils'
import StatsItem from "./StatsItem";
import LoadableComponent from "./LoadableComponent";

export default ({questId}) => {

    const [sessions, setSessions] = useState([])
    const [isLoading, setLoading] = useState(false)

    const fetchSessionsHandler = useCallback(async () => {
        setLoading(true)
        const sessionsResponse = await fetchSessions(questId)
        setSessions(sessionsResponse)
        setLoading(false)
    })

    useEffect(() => {
            fetchSessionsHandler()
        },
        [questId]
    )

    return (
        <div>
            <h2>Статистика</h2>
            <LoadableComponent loading={isLoading}>
                {sessions.map(session => {
                    const {
                        name, phone, questCode,
                        questionIndex, wrongAnswers, hintRetrievals,
                        createdDate, finishedDate, time
                    } = session
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
            </LoadableComponent>
        </div>
    )
}