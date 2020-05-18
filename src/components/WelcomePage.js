import React, {useCallback, useEffect, useState} from 'react'
import {updateSession} from '../api/api.js'
import {Redirect} from "react-router-dom";
import {fetchIntro} from "../api/api";
import PageInputBlock from "./PageInputBlock";

export default (props) => {
    const [intro, setIntro] = useState('')
    const [isTeamNameRequired, setTeamNameRequired] = useState(false)
    const [isPhoneRequired, setPhoneRequired] = useState(false)
    const [teamName, setTeamName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [apiError, setApiError] = useState('')
    const [isTeamNameIncorrect, setIsTeamIncorrect] = useState(false)
    const [isPhoneNumberIncorrect, setIsPhoneNumberIncorrect] = useState(false)
    const [canProceed, setCanProceed] = useState(false)

    const handleIntro = useCallback(async () => {
            const response = await fetchIntro()
            setIntro(response.intro)

            if (response.hasOwnProperty("isTeamNameRequired")) {
                setTeamNameRequired(response.isTeamNameRequired)
            } else {
                setTeamNameRequired(true)
            }
            if (response.hasOwnProperty("isPhoneRequired")) {
                setPhoneRequired(Boolean(response.isPhoneRequired))
            } else {
                setPhoneRequired(true)
            }
        }, []
    )

    useEffect(() => {
            handleIntro()
        }, []
    )

    async function submit(e) {
        e.preventDefault();
        let request = {}

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

        if (Object.keys(request).length !== 0) {
            const response = await updateSession(request)
            if (response.status !== 200) {
                const body = await response.json()
                setApiError(body.error)
                return
            }
        }
        setCanProceed(true)
    }

    function onNameInput(e) {
        setTeamName(e.target.value)
        setIsTeamIncorrect(false)
    }

    function onPhoneInput(e) {
        setPhoneNumber(e.target.value)
        setIsPhoneNumberIncorrect(false)
    }

    return canProceed ? (<Redirect to={props.redirectPath}/>) : (
        <div className="regular-page">
            <div id='introductory-paragraph' dangerouslySetInnerHTML={{__html: intro}}/>
            <form onSubmit={submit}>
                {isTeamNameRequired && <PageInputBlock
                    label="Введите свое имя или имя Вашей команды"
                    error={isTeamNameIncorrect ? "Поле не должно быть пустым" : null}
                    onInput={onNameInput}
                />}
                {isPhoneRequired && <PageInputBlock
                    label="Введите контактный телефон"
                    placeholder='пример: +371 20000000'
                    pattern="\+?[0-9]{0,3}\W*(?:\d+\W*){1,}(\d{1,2})$"
                    error={isPhoneNumberIncorrect ? "Телефонный номер должен соотетствовать формату xxxxxxxx или +ХХХ хххххх" : null}
                    onInput={onPhoneInput}
                />}
                <div>
                    <input type='submit' className="regular-button" value='Продолжить'/>
                    {apiError ? <div className='error-message'>{apiError}</div> : null}
                </div>
            </form>
        </div>)
}
