import React from "react";
import Panel from "./Panel.js";
import EditableEntry from './EditableEntry.js';
import EditableArrayEntry from "./EditableArrayEntry";
import styles from '../styles/accordion.css';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: -1,
            itemsToRemove: []
        };
    }

    activateTab(index) {
        this.setState(prev => ({
            activeTab: prev.activeTab === index ? -1 : index
        }));
    }

    render() {
        const {isEditMode, title, unsavedContent, content: savedContent} = this.props;
        const {activeTab} = this.state;
        return (
            <div className="accordion" role="tablist">
                <div className='prop-title'>{title}</div>
                {unsavedContent.map((entry, index) => {
                    const {__id, ...question} = entry;
                    const savedContentEntry = savedContent.find(e => e.__id === __id);
                    const isNewItem = savedContentEntry === undefined;
                    return (
                        <Panel
                            key={__id}
                            title={`Вопрос ${index + 1}`}
                            activeTab={activeTab}
                            index={index}
                            isEditMode={isEditMode}
                            removeItem={() => this.props.removeItem(__id)}
                            isNewItem={isNewItem}
                            activateTab={this.activateTab.bind(this, index)}
                        >
                            <div>
                                {
                                    Object.entries(question).map(([key, value], idx) => {
                                        return Array.isArray(value)
                                            ? <EditableArrayEntry
                                                name={key}
                                                key={idx}
                                                values={value}
                                                isEditMode={isEditMode}
                                                onChangeFunc={content => this.props.propagateArrayValue(__id, key, content)}
                                            />
                                            : <EditableEntry
                                                key={idx}
                                                title={key}
                                                content={savedContentEntry ? savedContentEntry[key] : {}}
                                                unsavedContent={value}
                                                propagateContent={content => this.props.propagateArrayValue(__id, key, content)}
                                                isEditMode={isEditMode}
                                            />
                                    })
                                }
                            </div>
                        </Panel>
                    )
                })}
                {isEditMode && <button id='add-new-item' onClick={this.props.addItem}>+ Add</button>}
            </div>
        );
    }
}
