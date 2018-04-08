import React from "react";
import Panel from "./Panel.js";
import EditableEntry from './EditableEntry.js';
import styles from '../styles/accordion.css';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: -1,
        };

        this.activateTab = this.activateTab.bind(this);
    }

    activateTab(index) {
        this.setState(prev => ({
            activeTab: prev.activeTab === index ? -1 : index
        }));
    }

    render() {
        const { data } = this.props;
        const { activeTab } = this.state;
        return (
            <div className="accordion" role="tablist">
                <div className='prop-title'>{this.props.title}</div>
                {data.map((entry, index) => (
                    <Panel
                        title={entry.text}
                        key={index}
                        activeTab={activeTab}
                        index={index}
                        activateTab={this.activateTab.bind(null, index)}
                    >
                        <div>
                            {
                                Object.entries(entry).map(([key, value], idx) => {
                                    return <EditableEntry
                                        key={idx}
                                        title={key}
                                        content={value}
                                        propagateContent={content => this.props.propagateArrayValue(index, key, content)}
                                        isEditMode={this.props.isEditMode}
                                    />
                                })
                            }
                        </div>
                    </Panel>
                ))}
            </div>
        );
    }
}
