import React, {useCallback, useState} from 'react'
import {Redirect} from 'react-router-dom'
import {loginToAdmin} from '../api/apiAdmin'

export default () => {

    const [shouldRedirect, setShouldRedirect] = useState(false)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [error, setError] = useState('')

    function onFocus() {
        if (error)
            setError('')
    }

    const submitHandler = useCallback(async () => {
            try {
                await loginToAdmin(username, password)
                setShouldRedirect(true)
            } catch (e) {
                setError("Unable to login. Please try again")
            }
        }, [username, password]
    )

    function onSubmit(e) {
        e.preventDefault()
        if (!username || !password) {
            setError("Both username and password are mandatory")
        } else submitHandler()
    }

    function onUsernameInput(e) {
        setUsername(e.target.value)
    }

    function onPasswordInput(e) {
        setPassword(e.target.value)
    }

    return (
        <div className="regular-page">
            {shouldRedirect && <Redirect to='/admin'/>}
            <form onSubmit={onSubmit}>
                <div className="input-block">
                    <label htmlFor='username'>Username</label>
                    <input
                        id='username'
                        name='username'
                        type='text'
                        className={error ? 'incorrect' : ''}
                        onFocus={onFocus}
                        onInput={onUsernameInput}/>
                </div>
                <div className="input-block">
                    <label htmlFor='password'>Password</label>
                    <input
                        id='password'
                        name='password'
                        type='password'
                        className={error ? 'incorrect' : ''}
                        onFocus={onFocus}
                        onInput={onPasswordInput}/>
                </div>
                <div><input type='submit' className="regular-button" value='Submit'/></div>
                {error && <div className='error-message'>{error}</div>}
            </form>
        </div>
    )
}
