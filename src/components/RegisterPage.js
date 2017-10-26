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
            isIncorrectCode: false,
            isAlreadyRegistered: false
        }
    }

    register(e) {
        const onRegister = this.props.onRegister
        e.preventDefault();
        validateId(this.state.id)
            .then(r => {
                if (r.status >= 400) {
                    this.setState({ isIncorrectCode: true })

                }
                else {
                    onRegister()
                    this.setState({ isAlreadyRegistered: true })
                }
            }
            )
    }

    onInput(e) {
        this.setState({
            id: e.target.value,
            isIncorrectCode: false
        })
    }

    render() {
        return this.state.isAlreadyRegistered ? (<Redirect to='/' />) : (
            <div className="regular-page">
                <p>Приветствуем вас!</p>
                <p>Для начала квеста введите пожалуйста полученный код</p>
                <form onSubmit={this.register.bind(this)}>
                    <div><input type='text' onInput={this.onInput.bind(this)} className={this.state.isIncorrectCode ? 'incorrect' : ''} /></div>
                    <div><input type='submit' className="regular-button" value='Продолжить' /></div>
                </form>
                {this.state.isIncorrectCode ? <div className='error-message'>Неверный код</div> : null}
            </div>
        )
    }
}