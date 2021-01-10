import React, {FC, PropsWithChildren, useCallback, useEffect, useState} from "react"
import {fetchQuest, updateQuest} from '../api/apiAdmin'
import {RouteComponentProps} from 'react-router'
import {Redirect} from "react-router-dom";
import Accordion from "./Accordion";
import EditableCheckbox from "./EditableCheckbox";
import EditableEntry from "./EditableEntryV2";
import {Quest, QuestQuestion} from "../types/Quest";

export const generateRandomAlphanumeric = (): string => Math.random().toString(36).substr(2, 9);

type QuestQuestionProp = 'text' | 'answer' | 'hint' | 'images'
type QuestProp = 'name' | 'id' | 'finalWords' | 'intro' | 'isTeamNameRequired' | 'isPhoneRequired' | 'isCodeRequired'| 'showDonationSection' | 'questions'

const EditQuest: FC = (props: RouteComponentProps<any> & PropsWithChildren<any>) => {
    const defaultQuest: Quest = {
        name: "",
        id: "",
        finalWords: "",
        intro: "",
        isTeamNameRequired: false,
        showDonationSection: false,
        isPhoneRequired: false,
        isCodeRequired: false,
        questions: []
    }

    const [quest, setQuest] = useState<Quest>(defaultQuest)
    const [unsavedQuest, setUnsavedQuest] = useState<Quest>(defaultQuest)
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [shouldRedirectBack, setShouldRedirectBack] = useState<boolean>(false)

    const doFetchQuest = useCallback(() => {
        fetchQuest(props.match.params.questId)
            .then(quest => {
                setQuest(quest)
                setUnsavedQuest(quest)
            })
            .catch(() => setShouldRedirectBack(true))
    }, [props.match.params.questId])

    useEffect(() => doFetchQuest(), [props.match.params.questId])

    function toggleEditMode() {
        setIsEditMode(!isEditMode);
    }

    function setNewValue(propName: QuestProp, propValue: any) {
        setUnsavedQuest({...unsavedQuest, [propName]: propValue})
    }

    function addItemToQuestionsArray() {
        const questions = unsavedQuest?.questions;
        let arr = questions ? [...questions] : []
        const defaultQuestion: QuestQuestion = {
            text: "",
            answer: "",
            hint: "",
            images: [],
            __id: generateRandomAlphanumeric()
        };
        arr.push(defaultQuestion);
        setUnsavedQuest({...quest, questions: arr})
    }

    function setNewValueForQuestionsItem(__id: string, propName: QuestQuestionProp, propValue: any) {
        let arr = [...unsavedQuest.questions];
        const index = arr.findIndex(e => e.__id === __id);
        let item = {...arr[index]};
        item[propName] = propValue;
        arr[index] = item;
        setUnsavedQuest({...quest, questions: arr})
    }


    function removeItemFromQuestionsArray(__id: string) {
        let arr = [...unsavedQuest.questions];
        const index = arr.findIndex(e => e.__id === __id);
        arr.splice(index, 1);
        setUnsavedQuest({...quest, questions: arr})
    }

    function submitChanges() {
        const {questId} = props.match.params;
        updateQuest(questId, unsavedQuest)
            .then(quest => {
                setQuest(quest)
                setUnsavedQuest(quest)
                setIsEditMode(false)
            })
    }

    function goBack() {
        setShouldRedirectBack(true)
    }

    return (
        <div className='admin-page'>

            {shouldRedirectBack && <Redirect to='/admin'/>}

            <button onClick={toggleEditMode} className="admin-button">Редактировать</button>

            {quest &&
            <div className='quest-props'>

                <EditableEntry label='Название квеста:'
                               name='name'
                               value={unsavedQuest.name}
                               onChangeFunc={event => setNewValue('name', event.target.value)}
                               isEditMode={isEditMode}
                />

                <EditableEntry label='Вводные слова:'
                               name='intro'
                               value={unsavedQuest.intro}
                               onChangeFunc={event => setNewValue('intro', event.target.value)}
                               isEditMode={isEditMode}
                />

                <EditableCheckbox name='isCodeRequired'
                                  value={unsavedQuest.isCodeRequired ?? true}
                                  label='Для прохождения нужен код?'
                                  isEditMode={isEditMode}
                                  onChangeFunc={event => setNewValue('isCodeRequired', event.target.checked)}
                />

                <EditableCheckbox name='isTeamNameRequired'
                                  value={unsavedQuest.isTeamNameRequired}
                                  label='Спрашивать имя/название команды?'
                                  isEditMode={isEditMode}
                                  onChangeFunc={event => setNewValue('isTeamNameRequired', event.target.checked)}
                />

                <EditableCheckbox name='isPhoneRequired'
                                  value={unsavedQuest.isPhoneRequired}
                                  label='Спрашивать номер телефона?'
                                  isEditMode={isEditMode}
                                  onChangeFunc={event => setNewValue('isPhoneRequired', event.target.checked)}
                />

                <EditableCheckbox name='showDonationSection'
                                  value={unsavedQuest.showDonationSection}
                                  label='Пожертвования?'
                                  isEditMode={isEditMode}
                                  onChangeFunc={event => setNewValue('showDonationSection', event.target.checked)}
                />

                <EditableEntry label='Заключительные слова:'
                               name='finalWords'
                               value={unsavedQuest.finalWords}
                               onChangeFunc={event => setNewValue('finalWords', event.target.value)}
                               isEditMode={isEditMode}
                />

                <div className='accordion-holder'>
                    <Accordion title='Вопросы:'
                               isEditMode={isEditMode}
                               content={quest.questions}
                               unsavedContent={unsavedQuest.questions}
                               propagateArrayValue={setNewValueForQuestionsItem}
                               removeItem={removeItemFromQuestionsArray}
                               addItem={addItemToQuestionsArray}
                    />
                </div>
            </div>
            }

            <button className="admin-button" onClick={goBack}>{'<'}</button>
            <button className="admin-button" onClick={submitChanges}>Сохранить</button>
        </div>
    )
}

export default EditQuest
