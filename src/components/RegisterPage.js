import React from 'react'
import { Link } from 'react-router-dom'
import { PureComponent } from 'react'
import { validateId } from '../api/api.js'

export default class extends PureComponent {
    constructor (props) {
        super(props)
        this.state = {
            id: '1234'
        }        
    }

    register() {
        console.log("object");
        validateId(this.state.id)
    }

    render() {
        return (
            <div className="regular-page">
                <p>Приветствуем вас!</p>
                <p>Для начала квеста введите пожалуйста полученный код</p>
                <form onSubmit={this.register.bind(this)}>
                    <div><input type='text' /></div>
                    <div><input type='submit' className="regular-button" value='Продолжить' /></div>
                </form>
            </div>
        )
    }
}