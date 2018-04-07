import React from 'react'
import { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import { postQuest } from '../api/api.js'
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

    onSubmit(e) {
        e.preventDefault();
        postQuest(this.state).then(() => this.setState({ shouldRedirect: true }))
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
                {this.state.shouldRedirect && (<Redirect to='/admin' />)}
            </div>
        )
    }
}