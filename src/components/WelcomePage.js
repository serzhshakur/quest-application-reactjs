import React, {useEffect, useState} from 'react'
import {renameSession} from '../api/api.js'
import {Redirect} from "react-router-dom";
import {fetchIntro} from "../api/api";
import PageInputBlock from "./PageInputBlock";

export default (props) => {
    const [introText, setIntroText] = useState('')
    const [teamName, setTeamName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [isTeamNameIncorrect, setIsTeamIncorrect] = useState(false)
    const [isPhoneNumberIncorrect, setIsPhoneNumberIncorrect] = useState(false)
    const [canProceed, setCanProceed] = useState(false)

    useEffect(() => {
            (async function () {
                const text = await fetchIntro()
                setIntroText(text)
            })()
        },
        []
    )

    function submit(e) {
        e.preventDefault();
        if (!teamName) {
            setIsTeamIncorrect(true)
        } else if (!phoneNumber) {
            setIsPhoneNumberIncorrect(true)
        } else {
            renameSession(teamName)
                .then(r => {
                    if (r.status === 200) {
                        setCanProceed(true)
                    } else {
                        setIsTeamIncorrect(true)
                    }
                })
        }
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
            <div id='introductory-paragraph' dangerouslySetInnerHTML={{__html: introText}}/>
            <form onSubmit={submit}>
                <PageInputBlock
                    label="Введите свое имя или имя Вашей команды"
                    error={isTeamNameIncorrect ? "Поле не должно быть пустым" : null}
                    onInput={onNameInput}
                />
                <PageInputBlock
                    label="Введите контактный телефон"
                    placeholder='пример: +371 20000000'
                    pattern="\+?[0-9]{0,3}\W*(?:\d+\W*){1,}(\d{1,2})$"
                    error={isPhoneNumberIncorrect ? "Телефонный номер должен соотетствовать формату xxxxxxxx или +ХХХ хххххх" : null}
                    onInput={onPhoneInput}
                />
                <div>
                    <input type='submit' className="regular-button" value='Продолжить'/>
                </div>
            </form>
        </div>)
}
