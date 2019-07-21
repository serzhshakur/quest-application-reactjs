import React from 'react'
import { Redirect } from 'react-router-dom'
import { PureComponent } from 'react'
import { validateId } from '../api/api.js'
import styles from '../styles/input.css'

export default class extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            isIncorrect: false,
            isRegistered: false
        }
    }

    register(e) {
        e.preventDefault();
        const onRegister = this.props.onRegister
        const id = this.state.id;
        if (!id) {
            this.setState({ isIncorrect: true })
        } else {
            validateId(id)
                .then(r => {
                    if (r.status >= 400) {
                        this.setState({ isIncorrect: true })
                    }
                    else {
                        onRegister()
                        this.setState({ isRegistered: true })
                    }
                })
        }
    }

    onInput(e) {
        this.setState({
            id: e.target.value,
            isIncorrect: false
        })
    }

    render() {
        return this.state.isRegistered ? (<Redirect to={this.props.redirectPath} />) : (
            <div className="regular-page">
                <p>Приветствуем вас!</p>
                <p>Для начала квеста введите пожалуйста полученный код</p>
                <form onSubmit={this.register.bind(this)}>
                    <div><input type='text' onInput={this.onInput.bind(this)} className={this.state.isIncorrect ? 'incorrect' : ''} /></div>
                    <div><input type='submit' className="regular-button" value='Продолжить' /></div>
                </form>
                {this.state.isIncorrect ? <div className='error-message'>Неверный код</div> : null}
            </div>
        )
    }
}