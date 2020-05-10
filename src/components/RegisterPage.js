import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import {validateId} from '../api/api.js'
import PageInputBlock from "./PageInputBlock";

export default (props) => {
    const [id, setId] = useState('')
    const [error, setError] = useState()
    const [isRegistered, setIsRegistered] = useState(false)

    async function register(e) {
        e.preventDefault();
        if (!id) {
            setError("Необходимо ввести код")
        } else {
            const response = await validateId(id)
            if (response.status !== 200) {
                const apiBody = await response.json()
                setError(apiBody.error ? apiBody.error : "Неверный код")
            } else {
                props.onRegister()
                setIsRegistered(true)
            }
        }
    }

    function onInput(e) {
        setId(e.target.value)
        setError(null)
    }

    return isRegistered ? (<Redirect to={props.redirectPath}/>) : (
        <div className="regular-page">
            <p>Приветствуем вас!</p>
            <p>Для начала квеста введите пожалуйста полученный код</p>
            <form onSubmit={register}>
                <PageInputBlock
                    onInput={onInput}
                    error={error}
                />
                <div><input type='submit' className="regular-button" value='Продолжить'/></div>
            </form>
        </div>
    )
}
