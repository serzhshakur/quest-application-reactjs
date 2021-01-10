import React, {ChangeEvent, FC, useCallback, useEffect, useState} from 'react'
import {Redirect} from "react-router-dom";
import {fetchIntro, updateSession, startOverSession, IntroResponse, SessionUpdateRequest} from "../api/clientApi";
import PageInputBlock from "./PageInputBlock";
import ReactMarkdown from 'react-markdown';

type EntityProps = {
    redirectPath: string,
    hasPendingSession?: boolean
}

const WelcomePage: FC<EntityProps> = ({redirectPath, hasPendingSession}) => {

    const [intro, setIntro] = useState('')
    const [isTeamNameRequired, setTeamNameRequired] = useState(false)
    const [isPhoneRequired, setPhoneRequired] = useState(false)
    const [teamName, setTeamName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [apiError, setApiError] = useState('')
    const [isTeamNameIncorrect, setIsTeamIncorrect] = useState(false)
    const [isPhoneNumberIncorrect, setIsPhoneNumberIncorrect] = useState(false)
    const [canProceed, setCanProceed] = useState(false)
    const [shouldStartOver, setShouldStartOver] = useState(false)
    const [proceedWithExistingSession, setProceedWithExistingSession] = useState(false)

    const handleIntro = useCallback(async () => {
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

    useEffect(() => {
            handleIntro()
        }, []
    )

    const startOver = useCallback(async () => {
        await startOverSession()
        setShouldStartOver(true)
    }, [shouldStartOver])

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

        if (request.phone || request.name) {
            const response = await updateSession(request)
            if (response.status !== 200) {
                const body = await response.json()
                setApiError(body.error)
                return
            }
        }
        setCanProceed(true)
    }

    function onNameInput(e: ChangeEvent<HTMLInputElement>) {
        setTeamName(e.target.value)
        setIsTeamIncorrect(false)
    }

    function onPhoneInput(e: ChangeEvent<HTMLInputElement>) {
        setPhoneNumber(e.target.value)
        setIsPhoneNumberIncorrect(false)
    }

    return canProceed ? (<Redirect to={redirectPath}/>) : (
        <div className="regular-page">
            <div id='introductory-paragraph'>
                <ReactMarkdown>{intro}</ReactMarkdown>
            </div>
            <form onSubmit={submit}>
                {isTeamNameRequired && <PageInputBlock
                    label="Введите свое имя или имя Вашей команды"
                    error={isTeamNameIncorrect ? "Поле не должно быть пустым" : undefined}
                    onInput={onNameInput}
                />}
                {isPhoneRequired && <PageInputBlock
                    label="Введите контактный телефон"
                    placeholder='пример: +371 20000000'
                    pattern="\+?[0-9]{0,3}\W*(?:\d+\W*){1,}(\d{1,2})$"
                    error={isPhoneNumberIncorrect ? "Телефонный номер должен соотетствовать формату xxxxxxxx или +ХХХ хххххх" : undefined}
                    onInput={onPhoneInput}
                />}
                <div>
                    {proceedWithExistingSession && (<Redirect to="/quest"/>)}
                    {hasPendingSession
                        ? <div>
                            <p>Продолжить начатый или начать заново?</p>
                            <button onClick={() => setProceedWithExistingSession(true)}
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
        </div>)
}

export default WelcomePage
