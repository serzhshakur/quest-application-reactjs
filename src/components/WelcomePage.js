import React, {PureComponent} from 'react'
import {renameSession} from '../api/api.js'
import {Redirect} from "react-router-dom";
import {fetchIntro} from "../api/api";
import PageInputBlock from "./PageInputBlock";

export default class extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            teamName: '',
            phoneNumber: '',
            isTeamNameIncorrect: false,
            isPhoneNumberIncorrect: false,
            canProceed: false
        }
    }

    componentDidMount() {
        fetchIntro().then(text => this.setState({introText: text}))
    }

    submit(e) {
        e.preventDefault();
        const {teamName, phoneNumber} = this.state;
        if (!teamName) {
            this.setState({isTeamNameIncorrect: true})
        } else if (!phoneNumber) {
            this.setState({isPhoneNumberIncorrect: true})
        } else {
            renameSession(teamName)
                .then(r => {
                    if (r.status === 200) {
                        this.setState({canProceed: true})
                    } else {
                        this.setState({isTeamNameIncorrect: true})
                    }
                })
        }
    }

    onNameInput(e) {
        this.setState({
            teamName: e.target.value,
            isTeamNameIncorrect: false
        })
    }

    onPhoneInput(e) {
        this.setState({
            phoneNumber: e.target.value,
            isPhoneNumberIncorrect: false
        })
    }

    render() {
        return this.state.canProceed ? (<Redirect to={this.props.redirectPath}/>) : (
            <div className="regular-page">
                <div id='introductory-paragraph' dangerouslySetInnerHTML={{__html: this.state.introText}}/>
                <form onSubmit={this.submit.bind(this)}>
                    <PageInputBlock
                        label="Введите свое имя или имя Вашей команды"
                        error={this.state.isTeamNameIncorrect ? "Поле не должно быть пустым" : null}
                        onInput={this.onNameInput.bind(this)}
                    />
                    <PageInputBlock
                        label="Введите контактный телефон"
                        placeholder='пример: +371 20000000'
                        pattern="\+?[0-9]{0,3}\W*(?:\d+\W*){1,}(\d{1,2})$"
                        error={this.state.isPhoneNumberIncorrect ? "Телефонный номер должен соотетствовать формату xxxxxxxx или +ХХХ хххххх" : null}
                        onInput={this.onPhoneInput.bind(this)}
                    />
                    <div>
                        <input type='submit' className="regular-button" value='Продолжить'/>
                    </div>
                </form>
            </div>)
    }
}
