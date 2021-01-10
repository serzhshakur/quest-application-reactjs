import React, {ChangeEvent, FC, useState} from 'react'
import {validateId} from '../api/api.js'
import PageInputBlock from "./PageInputBlock";
import {Redirect} from "react-router";

const RegisterPage: FC = () => {
    const [id, setId] = useState<string>()
    const [error, setError] = useState<string>()
    const [isRegistered, setRegistered] = useState(false)

    async function register(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!id || id.length === 0) {
            setError("Необходимо ввести код")
        } else {
            const response = await validateId(id)
            if (!response.ok) {
                const apiBody = await response.json()
                setError(apiBody.error ? apiBody.error : "Неверный код")
            } else setRegistered(true)
        }
    }

    function onInput(e: ChangeEvent<HTMLInputElement>) {
        setId(e.target.value)
        setError('')
    }

    return isRegistered ? <Redirect to='/welcome'/> : (
        <div className="regular-page">
            <p>Приветствуем вас!</p>
            <p>Для начала квеста введите пожалуйста полученный код</p>
            <form onSubmit={register}>
                <PageInputBlock
                    onInput={onInput}
                    error={error}
                />
                <div>
                    <input type='submit' className="regular-button" value='Продолжить'/>
                </div>
            </form>
        </div>
    )
}

export default RegisterPage
