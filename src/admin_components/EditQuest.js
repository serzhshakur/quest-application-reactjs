import React from 'react'
import { Redirect } from 'react-router-dom'
import { PureComponent } from 'react'
import { fetchQuest, updateQuest } from '../api/api.js'
import EditableEntry from './EditableEntry.js'
import Accordion from './Accordion.js'


export default class extends PureComponent {
    constructor(props) {
        super(props)
        this.QUESTIONS_ARRAY_NAME = 'questions'
        this.state = {
            quest: undefined,
            unsavedQuest: {},
            isEditMode: false,
            shouldRedirectBack: false
        }
    }

    generateRandomAlphanumeric = () => Math.random().toString(36).substr(2, 9);

    componentDidMount() {
        fetchQuest(this.props.match.params.questId)
            .then(quest => this.setState({ quest, unsavedQuest: quest }))
    }

    enableEditMode(e) {
        e.preventDefault();
        this.setState({ isEditMode: !this.state.isEditMode });
    }

    setNewValue(propName, propValue) {
        this.setState({ unsavedQuest: { ...this.state.unsavedQuest, [propName]: propValue } })
    }

    addItemToQuestionsArray() {
        const questions = this.state.unsavedQuest[this.QUESTIONS_ARRAY_NAME];
        let arr = questions ? [...questions] : []
        const defaultQuestion = {
            text: "",
            answer: "",
            hint: "",
            __id: this.generateRandomAlphanumeric()
        };
        arr.push(defaultQuestion);
        this.setNewValue(this.QUESTIONS_ARRAY_NAME, arr);
    }

    setNewValueForQuestionsItem(__id, propName, propValue) {
        let arr = [...this.state.unsavedQuest[this.QUESTIONS_ARRAY_NAME]];
        let index = arr.findIndex(e => e.__id == __id);
        let item = { ...arr[index] };
        item[propName] = propValue;
        arr[index] = item;
        this.setNewValue(this.QUESTIONS_ARRAY_NAME, arr);
    }

    removeItemFromQuestionsArray(__id) {
        let arr = [...this.state.unsavedQuest[this.QUESTIONS_ARRAY_NAME]];
        const index = arr.findIndex(e => e.__id == __id);
        arr.splice(index, 1);
        this.setNewValue(this.QUESTIONS_ARRAY_NAME, arr);
    }

    submitChanges() {
        const { questId } = this.props.match.params;
        const { unsavedQuest } = this.state;

        updateQuest(questId, unsavedQuest)
            .then(quest => {
                this.setState({ quest, unsavedQuest: quest })
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
                            unsavedContent={this.state.unsavedQuest.name}
                            propagateContent={content => this.setNewValue('name', content)}
                            isEditMode={this.state.isEditMode} />

                        <EditableEntry
                            title='Quest id:'
                            content={this.state.quest.id}
                            unsavedContent={this.state.unsavedQuest.id}
                            propagateContent={content => this.setNewValue('id', content)}
                            isEditMode={this.state.isEditMode} />

                        <EditableEntry
                            title='Quest intro:'
                            content={this.state.quest.intro}
                            unsavedContent={this.state.unsavedQuest.intro}
                            propagateContent={content => this.setNewValue('intro', content)}
                            isEditMode={this.state.isEditMode} />

                        <EditableEntry
                            title='Final words:'
                            content={this.state.quest.finalWords}
                            unsavedContent={this.state.unsavedQuest.finalWords}
                            propagateContent={content => this.setNewValue('finalWords', content)}
                            isEditMode={this.state.isEditMode} />

                        <div className='accordion-holder'>
                            <Accordion
                                title='Questions:'
                                isEditMode={this.state.isEditMode}
                                content={this.state.quest.questions ? this.state.quest.questions : []}
                                unsavedContent={this.state.unsavedQuest.questions ? this.state.unsavedQuest.questions : []}
                                propagateArrayValue={(__id, key, value) => this.setNewValueForQuestionsItem(__id, key, value)}
                                removeItem={__id => this.removeItemFromQuestionsArray(__id)}
                                addItem={() => this.addItemToQuestionsArray()}
                            />
                        </div>

                    </div>}

                <button className="admin-button" onClick={this.submitChanges.bind(this)}>Save</button>

                <button className="admin-button" onClick={this.goBack.bind(this)}>Go Back</button>

            </div>
        )
    }
}