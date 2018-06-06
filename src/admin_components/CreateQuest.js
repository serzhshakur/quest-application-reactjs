import React from 'react'
import { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import { postQuest } from '../api/apiAdmin'
import styles from '../styles/input.css'

export default class extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            values: {
                name: '',
                id: ''
            },
            shouldRedirect: false,
            errorMessage: undefined
        }
    }

    goBack() {
        this.setState({ shouldRedirect: true })
    }

    onSubmit(e) {
        e.preventDefault();

        if (Object.values(this.state.values).some(v => !v)) {
            this.setState({ errorMessage: 'Values must not be empty' });
        } else {
            postQuest({
                ...this.state.values,
                questions: []
            }).then(response => {
                if (response.error) {
                    this.setState({ errorMessage: response.error });
                } else {
                    this.goBack()
                }
            })
        }
    }

    onInput(e) {
        this.setState({
            values: {
                ...this.state.values,
                [e.target.name]: e.target.value
            }
        })
    }

    render() {
        return (
            <div className="regular-page">
                {this.state.shouldRedirect && (<Redirect to='/admin' />)}
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div>
                        <label htmlFor='id'>Quest id</label>
                        <input
                            id='id'
                            name='id'
                            type='text'
                            onInput={this.onInput.bind(this)}
                            className={this.state.errorMessage ? 'incorrect' : ''}
                        />
                    </div>
                    <div>
                        <label htmlFor='name'>Quest name</label>
                        <input
                            id='name'
                            name='name'
                            type='text'
                            onInput={this.onInput.bind(this)}
                        />
                    </div>
                    <div><input type='submit' className="regular-button" value='Submit' /></div>
                </form>
                <button className="regular-button" onClick={this.goBack.bind(this)}>{'<'}</button>
                {this.state.errorMessage && <div className='error-message'>{this.state.errorMessage}</div>}
            </div>
        )
    }
}