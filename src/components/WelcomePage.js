import React, {PureComponent} from 'react'
import {renameSession} from '../api/api.js'
import {Redirect} from "react-router-dom";
import {fetchIntro} from "../api/api";

export default class extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            teamName: '',
            isIncorrect: false,
            canProceed: false
        }
    }

    componentDidMount() {
        fetchIntro().then(text => this.setState({introText: text}))
    }

    submit(e) {
        e.preventDefault();
        const teamName = this.state.teamName;
        if (!teamName) {
            this.setState({isIncorrect: true})
        } else {
            renameSession(teamName)
                .then(r => {
                    if (r.status === 200) {
                        this.setState({canProceed: true})
                    } else {
                        this.setState({isIncorrect: true})
                    }
                })
        }
    }

    onNameInput(e) {
        this.setState({
            teamName: e.target.value,
            isIncorrect: false
        })
    }

    render() {
        return this.state.canProceed ? (<Redirect to={this.props.redirectPath}/>) : (
            <div className="regular-page">
                <div id='introductory-paragraph' dangerouslySetInnerHTML={{__html: this.state.introText}}/>
                <form onSubmit={this.submit.bind(this)}>
                    <div>
                        <label>Введите свое имя или имя Вашей команды</label>
                        <input type='text' onInput={this.onNameInput.bind(this)}
                               className={this.state.isIncorrect ? 'incorrect' : ''}/>
                    </div>
                    <div>
                        <input type='submit' className="regular-button" value='Продолжить'/>
                    </div>
                </form>
                {this.state.isIncorrect ? <div className='error-message'>Поле не должно быть пустым</div> : null}
            </div>)
    }
}
