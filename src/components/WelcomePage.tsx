import React, {ChangeEvent, FC, useCallback, useEffect, useState} from 'react'
import {Redirect} from "react-router-dom";
import {
    fetchIntro,
    fetchSession,
    IntroResponse,
    SessionResponse,
    SessionUpdateRequest,
    startOverSession,
    updateSession
} from "../api/clientApi";
import PageInputBlock from "./PageInputBlock";
import ReactMarkdown from 'react-markdown';
import {useParams} from "react-router";

type PathParams = {
    questId?: string
}

const WelcomePage: FC = () => {

    let {questId} = useParams<PathParams>();

    const [intro, setIntro] = useState('')

    const [teamName, setTeamName] = useState('')
    const [isTeamNameRequired, setTeamNameRequired] = useState(false)
    const [isTeamNameIncorrect, setIsTeamIncorrect] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [isPhoneRequired, setPhoneRequired] = useState(false)
    const [isPhoneNumberIncorrect, setIsPhoneNumberIncorrect] = useState(false)
    const [apiError, setApiError] = useState('')

    const [needToAuthorize, setNeedToAuthorize] = useState(false)
    const [hasActiveSession, setHasActiveSession] = useState(false)

    const [shouldProceed, setShouldProceed] = useState(false)
    const [shouldRestartSession, setShouldRestartSession] = useState(false)
    const [shouldContinueSession, setShouldContinueSession] = useState(false)

    const introFetcher = useCallback(async () => {
            const response: IntroResponse = await fetchIntro()
            setIntro(response.intro)

            if (response.isTeamNameRequired) {
                setTeamNameRequired(response.isTeamNameRequired)
            }
            if (response.isPhoneRequired) {
                setPhoneRequired(response.isPhoneRequired)
            }
        }, []
    )

    const sessionFetcher = useCallback(async () => {
        const response = await fetchSession(questId)
        if (response.ok) {
            const session: SessionResponse = await response.json()
            if (!session.isNewSession && !session.finished) {
                setHasActiveSession(true)
            }
            introFetcher().catch(() => setNeedToAuthorize(true))
        } else setNeedToAuthorize(true)
    }, [questId])


    useEffect(() => {
        sessionFetcher().catch(() => setNeedToAuthorize(true))
    }, [questId])

    const startOver = useCallback(async () => {
        await startOverSession()
        setShouldRestartSession(true)
    }, [questId])

    async function submit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        let request: SessionUpdateRequest = {}

        if (isTeamNameRequired) {
            if (!teamName) {
                setIsTeamIncorrect(true)
                return
            } else {
                request.name = teamName
            }
        }

        if (isPhoneRequired) {
            if (!phoneNumber) {
                setIsPhoneNumberIncorrect(true)
                return
            } else {
                request.phone = phoneNumber
            }
        }

        const response = await updateSession(request)
        if (response.status !== 200) {
            const body = await response.json()
            setApiError(body.error)
            return
        }
        setShouldProceed(true)
    }

    function onNameInput(e: ChangeEvent<HTMLInputElement>) {
        setTeamName(e.target.value)
        setIsTeamIncorrect(false)
    }

    function onPhoneInput(e: ChangeEvent<HTMLInputElement>) {
        setPhoneNumber(e.target.value)
        setIsPhoneNumberIncorrect(false)
    }

    return (
        <div>
            {needToAuthorize && <Redirect to="/register"/>}
            {(shouldProceed || shouldRestartSession || shouldContinueSession) && <Redirect to="/quest"/>}

            <div className="regular-page">
                <div id='introductory-paragraph'>
                    <ReactMarkdown>{intro}</ReactMarkdown>
                </div>
                <form onSubmit={submit}>
                    {(!hasActiveSession && isTeamNameRequired)
                    && <PageInputBlock label="Введите свое имя или имя Вашей команды"
                                       error={isTeamNameIncorrect ? "Поле не должно быть пустым" : undefined}
                                       onInput={onNameInput}
                    />}
                    {(!hasActiveSession && isPhoneRequired)
                    && <PageInputBlock label="Введите контактный телефон"
                                       placeholder='пример: +371 20000000'
                                       pattern="\+?[0-9]{0,3}\W*(?:\d+\W*){1,}(\d{1,2})$"
                                       error={isPhoneNumberIncorrect ? "Телефонный номер должен соотетствовать формату xxxxxxxx или +ХХХ хххххх" : undefined}
                                       onInput={onPhoneInput}
                    />}
                    <div>
                        {hasActiveSession
                            ? <div>
                                <p>Продолжить начатый или начать заново?</p>
                                <button onClick={() => setShouldContinueSession(true)}
                                        className="regular-button">
                                    Продолжить начатый
                                </button>
                                <button onClick={startOver}
                                        className="regular-button">
                                    Начать заново
                                </button>
                            </div>
                            : <input type='submit' className="regular-button" value='Продолжить'/>
                        }
                        {apiError ? <div className='error-message'>{apiError}</div> : null}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default WelcomePage
