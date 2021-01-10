import React, {FC, useState} from 'react'
import QuestCodesTable from "./QuestCodesTable";
import SessionsList from "./SessionsList";
import CopyToClipboardIcon from "../components/svg/CopyToClipboardIcon";
import {baseUrl} from "../api/clientApi";
import {Redirect, useLocation, useParams} from "react-router";

type PathParams = {
    questId?: string
}

interface LocationState {
    questName: string
}

const QuestionStatistics: FC = () => {

    let {questId} = useParams<PathParams>();
    let {state} = useLocation<LocationState>();

    const [shouldRedirectBack, setShouldRedirectBack] = useState(false)

    function goBack() {
        setShouldRedirectBack(true);
    }

    return (
        <div className='admin-page'>
            {shouldRedirectBack && <Redirect to='/admin'/>}
            <h1>{state.questName}</h1>
            <p>Копировать прямую ссылку:<CopyToClipboardIcon valueToCopy={baseUrl.replace(/\/+$/, '') + '/' + questId}/>
            </p>
            <QuestCodesTable questId={questId}/>
            <SessionsList questId={questId}/>
            <button className="admin-button" onClick={goBack}>{'<'}</button>
        </div>
    )
}
export default QuestionStatistics
