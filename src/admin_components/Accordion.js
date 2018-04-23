import React from "react";
import Panel from "./Panel.js";
import EditableEntry from './EditableEntry.js';
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

    markItemForRemoval(index) {
        let items = [...this.state.itemsToRemove];
        if (!items.includes(index)) {
            items.push(index)
        }
        this.props.removeItem(index);
        this.setState({ itemsToRemove: items });
    }

    render() {
        const { data } = this.props;
        const { activeTab } = this.state;
        return (
            <div className="accordion" role="tablist">
                <div className='prop-title'>{this.props.title}</div>
                {data.map((entry, index) => (
                    <Panel
                        key={index}
                        title={`Item ${index + 1}`}
                        activeTab={activeTab}
                        index={index}
                        isEditMode={this.props.isEditMode}
                        markItemForRemoval={this.markItemForRemoval.bind(this, index)}
                        isForRemoval={this.state.itemsToRemove.includes(index)}
                        activateTab={this.activateTab.bind(this, index)}
                    >
                        <div>
                            {
                                Object.entries(entry).map(([key, value], idx) => {
                                    return <EditableEntry
                                        key={idx}
                                        title={key}
                                        content={value}
                                        propagateContent={content => this.props.propagateValue(index, key, content)}
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
