import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import {cloneQuest, deleteQuest, fetchQuests} from '../api/apiAdmin'
import Section from "./Section.js";
import QuestsListAccordion from './QuestsListAccordion';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClone, faCog, faPen, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import ActionButton from "./ActionButton";

import '../styles/admin.css';

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

    doCloneQuest(id) {
        cloneQuest(id).then(() => this.updateQuests())
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
                                            <Link to={`/admin/edit-quest/${id}`}>
                                                <FontAwesomeIcon title='edit' icon={faPen}/>
                                            </Link>
                                        </button>
                                        <button className='action-button'>
                                            <Link to={{
                                                pathname: `/admin/quest-statistics/${id}`,
                                                state: {questName: name}
                                            }}>
                                                <FontAwesomeIcon title='settings' icon={faCog}/>
                                            </Link>
                                        </button>
                                        <ActionButton
                                            className='action-button'
                                            title='Удалить'
                                            action={() => this.doQuestDeletion(id)}
                                        >
                                            <FontAwesomeIcon title='delete' icon={faTrashAlt}/>
                                        </ActionButton>
                                        <button
                                            className='action-button'
                                            onClick={() => this.doCloneQuest(id)}
                                        >
                                            <FontAwesomeIcon title='clone' icon={faClone}/>
                                        </button>
                                    </div>
                                </Section>
                            ))
                            }
                        </QuestsListAccordion>

                        <Link to='/admin/create-quest'>
                            <button id='submit-new-quest' className="admin-button">
                                Новый квест
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
