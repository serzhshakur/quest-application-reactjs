import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { fetchQuests } from '../api/apiAdmin'
import styles from '../styles/admin.css'

class Main extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            quests: null,
            shouldRedirectToLoginScreen: false
        }
    }

    componentDidMount() {
        fetchQuests()
            .then(quests => this.setState({ quests }))
            .catch(() => this.setState({ shouldRedirectToLoginScreen: true }))
    }

    render() {
        return (
            <React.Fragment>
                {this.state.shouldRedirectToLoginScreen && <Redirect to='/admin/login' />}
                <div className="admin-page">
                    {this.state.quests &&
                        <div>
                            <div className='quests-items-container'>
                                {this.state.quests.map(({ name, id }) => (
                                    <div className='quests-item' key={id}>
                                        <Link to={`/admin/edit-quest/${id}`}>{name}</Link>
                                    </div>
                                ))
                                }
                            </div>
                            <button id='submit-new-quest' className="admin-button">
                                <Link to='/admin/create-quest'>Create new quest</Link>
                            </button>
                        </div>
                    }
                </div>
            </React.Fragment>
        )
    }
}

export default Main 