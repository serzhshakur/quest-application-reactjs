import React, {FC, PropsWithChildren, useCallback, useEffect, useState} from 'react'
import {match, Redirect, RouteComponentProps} from "react-router";
import {
    fetchSessionForQuestId,
    isNewSession,
    isPendingSession,
    NewSessionResponse,
    SessionResponse
} from "../api/clientApi";

const DummyPage: FC<RouteComponentProps & PropsWithChildren<any>> = (props) => {
    const match: match<any> = props.match

    const [canProceedWithoutCode, setCanProceedWithoutCode] = useState(false)
    const [hasPendingSession, setHasPendingSession] = useState(false)
    const [needToAuthorize, setNeedToAuthorize] = useState(false)

    const sessionFetcher = useCallback(async () => {
        const response = await fetchSessionForQuestId(match.params.questId)
        if (response.ok) {
            const session: SessionResponse | NewSessionResponse = await response.json()
            if (isNewSession(session)) {
                setCanProceedWithoutCode(true)
            } else if (isPendingSession(session)) {
                !session.finished && setHasPendingSession(true)
            }
        } else setNeedToAuthorize(true)
    }, [match.params.questId])

    useEffect(() => {
        sessionFetcher()
            .catch(() => setNeedToAuthorize(true))
    }, [props.match.questId])

    return <div>
        {canProceedWithoutCode && <Redirect to="/welcome"/>}
        {hasPendingSession && <Redirect to="/quest"/>}
        {needToAuthorize && <Redirect to="/"/>}
    </div>
}

export default DummyPage
