import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import {deleteQuest, fetchQuests} from '../api/apiAdmin'
import Section from "./Section.js";
import QuestsListAccordion from './QuestsListAccordion';
import ActionButton from './ActionButton';

class Main extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            quests: null,
            shouldRedirectToLoginScreen: false
        }
    }

    updateQuests() {
        fetchQuests()
            .then(quests => this.setState({quests}))
            .catch(() => this.setState({shouldRedirectToLoginScreen: true}))
    }

    doQuestDeletion(id) {
        deleteQuest(id).then(() => this.updateQuests())
    }

    componentDidMount() {
        this.updateQuests()
    }

    render() {
        return (
            <React.Fragment>
                {this.state.shouldRedirectToLoginScreen && <Redirect to='/admin/login'/>}
                <div className="admin-page">
                    {this.state.quests &&
                    <div>
                        <QuestsListAccordion>
                            {this.state.quests.map(({name, id}) => (
                                <Section
                                    className='quests-item'
                                    key={id}
                                    title={name}
                                >
                                    <div className="quests-item-buttons">
                                        <button className='action-button'>
                                            <Link to={`/admin/edit-quest/${id}`}>Open</Link>
                                        </button>
                                        <button className='action-button'>
                                            <Link to={`/admin/quest-statistics/${id}`}>Statistics</Link>
                                        </button>
                                        <ActionButton
                                            className='action-button'
                                            title="Delete"
                                            action={() => this.doQuestDeletion(id)}
                                        />
                                    </div>
                                </Section>
                            ))
                            }
                        </QuestsListAccordion>

                        <Link to='/admin/create-quest'>
                            <button id='submit-new-quest' className="admin-button">
                                Create new quest
                            </button>
                        </Link>
                    </div>
                    }
                </div>
            </React.Fragment>
        )
    }
}

export default Main 