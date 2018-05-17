import React from 'react'
import { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import { postQuest } from '../api/apiAdmin'
import styles from '../styles/input.css'

export default class extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            questName: '',
            questId: '',
            shouldRedirect: false
        }
    }

    goBack() {
        this.setState({ shouldRedirect: true })
    }

    onSubmit(e) {
        e.preventDefault();
        postQuest({
            id: this.state.questId,
            name: this.state.questName,
            questions: []
        }).then(() => this.goBack())
    }

    onDescriptionInput(e) {
        this.setState({
            questName: e.target.value,
        })
    }

    onQuestIdInput(e) {
        this.setState({
            questId: e.target.value,
        })
    }

    render() {
        return (
            <div className="regular-page">
                {this.state.shouldRedirect && (<Redirect to='/admin' />)}
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div>
                        <label htmlFor='questId'>Quest identificator</label>
                        <input id='questId' name='questId' type='text' onInput={this.onQuestIdInput.bind(this)} />
                    </div>
                    <div>
                        <label htmlFor='questName'>Quest name</label>
                        <input id='questName' name='questName' type='text' onInput={this.onDescriptionInput.bind(this)} />
                    </div>
                    <div><input type='submit' className="regular-button" value='Submit' /></div>
                </form>
                <button className="regular-button" onClick={this.goBack.bind(this)}>{'<'}</button>
            </div>
        )
    }
}