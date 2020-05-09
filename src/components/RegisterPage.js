import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import {validateId} from '../api/api.js'
import PageInputBlock from "./PageInputBlock";

export default (props) => {
    const [id, setId] = useState('')
    const [isIncorrect, setIsIncorrect] = useState(false)
    const [isRegistered, setIsRegistered] = useState(false)

    function register(e) {
        e.preventDefault();
        const onRegister = props.onRegister
        if (!id) {
            setIsIncorrect(true)
        } else {
            validateId(id)
                .then(r => {
                    if (r.status >= 400) {
                        setIsIncorrect(true)
                    } else {
                        onRegister()
                        setIsRegistered(true)
                    }
                })
        }
    }

    function onInput(e) {
        setId(e.target.value)
        setIsIncorrect(false)
    }

    return isRegistered ? (<Redirect to={props.redirectPath}/>) : (
        <div className="regular-page">
            <p>Приветствуем вас!</p>
            <p>Для начала квеста введите пожалуйста полученный код</p>
            <form onSubmit={register}>
                <PageInputBlock
                    onInput={onInput}
                    error={isIncorrect ? "Неверный код" : null}
                />
                <div><input type='submit' className="regular-button" value='Продолжить'/></div>
            </form>
        </div>
    )
}
