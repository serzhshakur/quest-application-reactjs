import React from 'react'
import { Link } from 'react-router-dom'
import { fetchQuests } from '../api/api.js'
import styles from '../styles/admin.css'

class Main extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            quests: []
        }
    }

    componentDidMount() {
        fetchQuests().then(obj => this.setState({ quests: obj }))
    }

    render() {
        return (<div className="admin-page">
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
        </div>
        )
    }
}

export default Main 