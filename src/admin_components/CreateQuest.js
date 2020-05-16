import React, {PureComponent} from 'react'
import {Redirect} from 'react-router-dom'
import {postQuest} from '../api/apiAdmin'

export default class extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            values: {
                name: '',
                id: ''
            },
            shouldRedirect: false,
            error: {
                message: undefined,
                targets: []
            }
        }
    }

    goBack() {
        this.setState({shouldRedirect: true})
    }

    onSubmit(e) {
        e.preventDefault();
        const emptyKeys = Object.entries(this.state.values)
            .filter(([k, v]) => !v)
            .map(([k, v]) => k);

        if (emptyKeys.length > 0) {
            this.setState({error: {message: 'Values must not be empty', targets: emptyKeys}});
        } else {
            postQuest({
                ...this.state.values,
                questions: []
            }).then(response => {
                if (response.error) {
                    this.setState({error: {message: response.error, targets: []}});
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

        const targets = Array.from(this.state.error.targets);
        if (targets.includes(e.target.name)) {
            targets.splice(targets.indexOf(e.target.name), 1);
            this.setState({
                error: {
                    ...this.state.error,
                    targets
                }
            });
        }
    }

    render() {
        return (
            <div className="regular-page">
                {this.state.shouldRedirect && (<Redirect to='/admin'/>)}
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div>
                        <div>
                            <label htmlFor='id'>Quest id</label>
                        </div>
                        <input
                            id='id'
                            name='id'
                            type='text'
                            onInput={this.onInput.bind(this)}
                            className={this.state.error.targets.includes('id') ? 'incorrect' : ''}
                        />
                    </div>
                    <div>
                        <div>
                            <label htmlFor='name'>Quest name</label>
                        </div>
                        <input
                            id='name'
                            name='name'
                            type='text'
                            onInput={this.onInput.bind(this)}
                            className={this.state.error.targets.includes('name') ? 'incorrect' : ''}
                        />
                    </div>
                    <div><input type='submit' className="regular-button" value='Submit'/></div>
                </form>
                <button className="regular-button" onClick={this.goBack.bind(this)}>{'<'}</button>
                {this.state.error.message && <div className='error-message'>{this.state.error.message}</div>}
            </div>
        )
    }
}