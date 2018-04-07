import React from "react";
import Panel from "./Panel.js";
import styles from '../styles/accordion.css'

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: -1
        };

        this.activateTab = this.activateTab.bind(this);
    }

    activateTab(index) {
        this.setState(prev => ({
            activeTab: prev.activeTab === index ? -1 : index
        }));
    }

    render() {
        const { questions } = this.props;
        const { activeTab } = this.state;
        return (
            <div className="accordion" role="tablist">
                <div className='prop-title'>{this.props.title}</div>
                {questions.map((question, index) => (
                    <Panel
                        key={index}
                        activeTab={activeTab}
                        index={index}
                        {...question}
                        activateTab={this.activateTab.bind(null, index)}
                    />
                ))}
            </div>
        );
    }
}
