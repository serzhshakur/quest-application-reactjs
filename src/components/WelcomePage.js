import React from 'react'
import {PureComponent} from 'react'
import {renameSession} from '../api/api.js'
import {Redirect} from "react-router-dom";
import {fetchIntro} from "../api/api";

export default class extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: '',
            isIncorrect: false,
            isNameGiven: false
        }
    }

    componentDidMount() {
        fetchIntro().then(text => this.setState({introText: text}))
    }

    submit(e) {
        e.preventDefault();
        const inputValue = this.state.inputValue;
        if (!inputValue) {
            this.setState({isIncorrect: true})
        } else {
            renameSession(inputValue)
                .then(r => {
                    if (r.status == 200) {
                        this.setState({isNameGiven: true})
                    } else {
                        this.setState({isIncorrect: true})
                    }
                })
        }
    }

    onInput(e) {
        this.setState({
            inputValue: e.target.value,
            isIncorrect: false
        })
    }

    render() {
        return this.state.isNameGiven ? (<Redirect to={this.props.redirectPath}/>) : (
            <div className="regular-page">
                <div id='introductory-paragraph' dangerouslySetInnerHTML={{__html: this.state.introText}}/>
                <p>Введите свое имя или имя Вашей команды</p>
                <form onSubmit={this.submit.bind(this)}>
                    <div><input type='text' onInput={this.onInput.bind(this)}
                                className={this.state.isIncorrect ? 'incorrect' : ''}/></div>
                    <div><input type='submit' className="regular-button" value='Продолжить'/></div>
                </form>
                {this.state.isIncorrect ? <div className='error-message'>Поле не должно быть пустым</div> : null}
            </div>)
    }
}