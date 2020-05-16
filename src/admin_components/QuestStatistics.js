import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import QuestCodesTable from "./QuestCodesTable";
import SessionsList from "./SessionsList";

export default ({
                    match: {params: {questId}},
                    location: {state: {questName}}
                }) => {

    const [shouldRedirectBack, setShouldRedirectBack] = useState(false)

    function goBack() {
        setShouldRedirectBack(true);
    }

    return (
        <div className='admin-page'>
            {shouldRedirectBack && <Redirect to='/admin'/>}
            <h1>{questName}</h1>
            <QuestCodesTable questId={questId}/>
            <SessionsList questId={questId}/>
            <button className="admin-button" onClick={goBack}>{'<'}</button>
        </div>
    )
}