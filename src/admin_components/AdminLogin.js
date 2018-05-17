import React from 'react'
import { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import { loginToAdmin } from '../api/apiAdmin'
import styles from '../styles/input.css'

export default class extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            shouldRedirect: false,
            isLoginFailed: false
        }
    }

    onFocus() {
        if (this.state.isLoginFailed)
            this.setState({ isLoginFailed: false });
    }

    onSubmit(e) {
        e.preventDefault();
        loginToAdmin(this.state.username, this.state.password)
            .then(() => this.setState({ shouldRedirect: true }))
            .catch(() => this.setState({ isLoginFailed: true }))
    }

    onUsernameInput(e) {
        this.setState({
            username: e.target.value,
        })
    }

    onPasswordInput(e) {
        this.setState({
            password: e.target.value,
        })
    }

    render() {
        return (
            <div className="regular-page">
                {this.state.shouldRedirect && <Redirect to='/admin' />}
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div>
                        <label htmlFor='username'>Username</label>
                        <input
                            id='username'
                            name='username'
                            type='text'
                            className={this.state.isLoginFailed ? 'incorrect' : ''}
                            onFocus={this.onFocus.bind(this)}
                            onInput={this.onUsernameInput.bind(this)} />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            id='password'
                            name='password'
                            type='password'
                            className={this.state.isLoginFailed ? 'incorrect' : ''}
                            onFocus={this.onFocus.bind(this)}
                            onInput={this.onPasswordInput.bind(this)} />
                    </div>
                    <div><input type='submit' className="regular-button" value='Submit' /></div>
                    {this.state.isLoginFailed && <div className='error-message'>invalid username or password</div>}
                </form>
            </div>
        )
    }
}