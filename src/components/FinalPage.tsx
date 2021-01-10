import React, {FC, useCallback, useEffect, useState} from 'react'
import {fetchFinalWords} from '../api/api.js'
import {calculateTime} from '../utils/timeUtils'
import ReactMarkdown from 'react-markdown';
import DonationSection from "./DonationSection";

type FinalWords = {
    finalWords: string,
    wrongAnswers: number,
    hintRetrievals: number,
    time: number,
    name: string,
    showDonationSection?: boolean
}

type Time = {
    hours: number,
    minutes: string,
    seconds: string
}

const FinalPage: FC = () => {
    const [content, setContent] = useState<FinalWords>()
    const [completionTime, setCompletionTime] = useState<Time>()

    const doFetchFinalWords = useCallback(() => {
        fetchFinalWords()
            .then((c: FinalWords) => {
                setContent(c);
                const {hours, minutes, seconds} = calculateTime(c.time);
                setCompletionTime({
                    seconds, minutes, hours
                });
            })
    }, [content])

    useEffect(() => doFetchFinalWords(), [])

    return (
        <div className="regular-page">
            {content?.finalWords && <ReactMarkdown>{content?.finalWords}</ReactMarkdown>}
            {content?.name && <p>Командa "<span className="bold-text">{content?.name}</span>"</p>}
            <p className='bold-text'>Результаты:</p>
            <p>Неверных ответов <span className="bold-text">{content?.wrongAnswers ?? 0}</span></p>
            <p>Количество подсказок <span className="bold-text">{content?.hintRetrievals ?? 0}</span></p>
            <p>Время выполнения <span
                className="bold-text">{`${completionTime?.hours}:${completionTime?.minutes}:${completionTime?.seconds}`}
            </span>
            </p>

            <DonationSection isShown={content?.showDonationSection ?? false}/>

        </div>
    )
}

export default FinalPage
