import React from 'react'
import { Redirect } from 'react-router-dom'
import { PureComponent } from 'react'
import { fetchQuest, updateQuest } from '../api/apiAdmin'
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
            .catch(() => this.setState({ shouldRedirectBack: true }))
    }

    toggleEditMode(e) {
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
            images: [],
            __id: this.generateRandomAlphanumeric()
        };
        arr.push(defaultQuestion);
        this.setNewValue(this.QUESTIONS_ARRAY_NAME, arr);
    }

    setNewValueForQuestionsItem(__id, propName, propValue) {
        let arr = [...this.state.unsavedQuest[this.QUESTIONS_ARRAY_NAME]];
        let index = arr.findIndex(e => e.__id === __id);
        let item = { ...arr[index] };
        item[propName] = propValue;
        arr[index] = item;
        this.setNewValue(this.QUESTIONS_ARRAY_NAME, arr);
    }

    removeItemFromQuestionsArray(__id) {
        let arr = [...this.state.unsavedQuest[this.QUESTIONS_ARRAY_NAME]];
        const index = arr.findIndex(e => e.__id === __id);
        arr.splice(index, 1);
        this.setNewValue(this.QUESTIONS_ARRAY_NAME, arr);
    }

    submitChanges() {
        const { questId } = this.props.match.params;
        const { unsavedQuest } = this.state;

        updateQuest(questId, unsavedQuest)
            .then(quest => this.setState({ quest, unsavedQuest: quest }))
    }

    goBack() {
        this.setState({ shouldRedirectBack: true });
    }

    render() {
        const { shouldRedirectBack, quest, unsavedQuest, isEditMode } = this.state;
        return (
            <div className='admin-page'>

                {shouldRedirectBack && <Redirect to='/admin' />}

                <button onClick={this.toggleEditMode.bind(this)} className="admin-button">Edit</button>

                {quest &&
                    <div className='quest-props'>

                        <EditableEntry
                            title='Quest name:'
                            content={quest.name}
                            unsavedContent={unsavedQuest.name}
                            propagateContent={content => this.setNewValue('name', content)}
                            isEditMode={isEditMode} />

                        <EditableEntry
                            title='Quest id:'
                            content={quest.id}
                            unsavedContent={unsavedQuest.id}
                            propagateContent={content => this.setNewValue('id', content)}
                            isEditMode={isEditMode} />

                        <EditableEntry
                            title='Quest intro:'
                            content={quest.intro}
                            unsavedContent={unsavedQuest.intro}
                            propagateContent={content => this.setNewValue('intro', content)}
                            isEditMode={isEditMode} />

                        <EditableEntry
                            title='Final words:'
                            content={quest.finalWords}
                            unsavedContent={unsavedQuest.finalWords}
                            propagateContent={content => this.setNewValue('finalWords', content)}
                            isEditMode={isEditMode} />

                        <div className='accordion-holder'>
                            <Accordion
                                title='Questions:'
                                isEditMode={isEditMode}
                                content={quest.questions ? quest.questions : []}
                                unsavedContent={unsavedQuest.questions ? unsavedQuest.questions : []}
                                propagateArrayValue={this.setNewValueForQuestionsItem.bind(this)}
                                removeItem={this.removeItemFromQuestionsArray.bind(this)}
                                addItem={this.addItemToQuestionsArray.bind(this)}
                            />
                        </div>

                    </div>}

                <button className="admin-button" onClick={this.goBack.bind(this)}>{'<'}</button>
                <button className="admin-button" onClick={this.submitChanges.bind(this)}>Save</button>

            </div>
        )
    }
}