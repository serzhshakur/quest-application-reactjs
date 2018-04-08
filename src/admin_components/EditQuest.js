import React from 'react'
import { Redirect } from 'react-router-dom'
import { PureComponent } from 'react'
import { fetchQuest, updateQuest } from '../api/api.js'
import EditableEntry from './EditableEntry.js'
import Accordion from './Accordion.js'

export default class extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            quest: undefined,
            editedQuest: {},
            isEditMode: false,
            shouldRedirectBack: false
        }
    }

    componentDidMount() {
        fetchQuest(this.props.match.params.questId)
            .then(questObj => this.setState({ quest: questObj, editedQuest: questObj }))
    }

    enableEditMode(e) {
        e.preventDefault();
        this.setState({ isEditMode: !this.state.isEditMode });
    }

    setNewValue(propName, propValue) {
        this.setState({ editedQuest: { ...this.state.editedQuest, [propName]: propValue } })
    }

    setNewValueInArray(arrayName, index, propName, propValue) {
        let arr = [...this.state.editedQuest[arrayName]];
        let item = { ...arr[index] };
        item[propName] = propValue;
        arr[index] = item;
        this.setNewValue(arrayName, arr);
    }

    submitChanges() {
        const { questId } = this.props.match.params;
        const questDetails = this.state.editedQuest;
        console.log(this.state.editedQuest);
        updateQuest(questId, questDetails)
            .then(() => {
                this.setState({ editedQuest: {} });
                this.goBack();
            })
    }

    goBack() {
        this.setState({ shouldRedirectBack: true });
    }

    render() {
        return (
            <div className='admin-page'>

                {this.state.shouldRedirectBack && <Redirect to='/admin' />}

                <button onClick={this.enableEditMode.bind(this)} className="admin-button">Edit</button>

                {this.state.quest &&
                    <div className='quest-props'>

                        <EditableEntry
                            title='Quest name:'
                            content={this.state.quest.name}
                            propagateContent={content => this.setNewValue('name', content)}
                            isEditMode={this.state.isEditMode} />

                        <EditableEntry
                            title='Quest id:'
                            content={this.state.quest.id}
                            propagateContent={content => this.setNewValue('id', content)}
                            isEditMode={this.state.isEditMode} />

                        <EditableEntry
                            title='Quest intro:'
                            content={this.state.quest.intro}
                            propagateContent={content => this.setNewValue('intro', content)}
                            isEditMode={this.state.isEditMode} />

                        <EditableEntry
                            title='Final words:'
                            content={this.state.quest.finalWords}
                            propagateContent={content => this.setNewValue('finalWords', content)}
                            isEditMode={this.state.isEditMode} />

                        <div className='accordion-holder'>
                            <Accordion
                                title='Questions:'
                                propagateArrayValue={(index, key, value) => this.setNewValueInArray('questions', index, key, value)}
                                isEditMode={this.state.isEditMode}
                                data={this.state.quest.questions ? this.state.quest.questions : []}
                            />
                        </div>

                    </div>}

                <button className="admin-button" onClick={this.submitChanges.bind(this)}>Save</button>

                <button className="admin-button" onClick={this.goBack.bind(this)}>Go Back</button>

            </div>
        )
    }
}