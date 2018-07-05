import React from "react";
import PropTypes from 'prop-types';
import Section from "./Section.js";
import styles from '../styles/accordion.css';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: -1
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.children.length != this.props.children.length) {
            this.setState({ activeTab: -1 });
        }

    }

    activateTab(index) {
        this.setState(prev => ({
            activeTab: prev.activeTab === index ? -1 : index
        }));
    }

    render() {
        const { activeTab } = this.state;
        return (
            <div className="accordion">
                {this.props.children.map((child, index) => {
                    return React.cloneElement(child, {
                        activateTab: () => {
                            this.activateTab(index)
                        },
                        index,
                        activeTab
                    })
                })}
            </div>
        );
    }
}

React.propTypes = {
    children: PropTypes.arrayOf(PropTypes.instanceOf(Section))
}