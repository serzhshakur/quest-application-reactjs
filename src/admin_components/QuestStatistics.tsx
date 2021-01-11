import React, {FC, useCallback, useEffect, useState} from 'react'
import QuestCodesTable from "./QuestCodesTable";
import SessionsList from "./SessionsList";
import CopyToClipboardIcon from "../components/svg/CopyToClipboardIcon";
import {baseUrl} from "../api/clientApi";
import {useHistory, useLocation, useParams} from "react-router";
import {fetchQuest} from "../api/apiAdmin";

type PathParams = {
    questId: string
}

interface LocationState {
    questName: string
}

const QuestionStatistics: FC = () => {

    const {questId} = useParams<PathParams>();
    const {state} = useLocation<LocationState>();
    const history = useHistory();
    const directLink = baseUrl.replace(/\/+$/, '') + '/quest/' + questId

    const [isCodeRequired, setCodeRequired] = useState<boolean | null>(null)

    const doFetchQuest = useCallback(() => {
        fetchQuest(questId)
            .then(quest => setCodeRequired(quest.isCodeRequired ?? true))
    }, [questId])

    useEffect(() => doFetchQuest(), [questId])

    const goBack = useCallback(() => {
        history.goBack()
    }, [questId])

    return (
        <div className='admin-page'>
            <h1>{state.questName}</h1>
            {(isCodeRequired !== null && !isCodeRequired) &&
            <p>Копировать прямую ссылку:<CopyToClipboardIcon valueToCopy={directLink}/></p>}
            <button className="admin-button" onClick={goBack}>{'< назад'}</button>
            {isCodeRequired && <QuestCodesTable questId={questId}/>}
            <SessionsList questId={questId}/>
        </div>
    )
}
export default QuestionStatistics
