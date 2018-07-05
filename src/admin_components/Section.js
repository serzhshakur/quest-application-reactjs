import ReactDOM from "react-dom";
import React from "react";
import AnimateHeight from 'react-animate-height';

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { activeTab, index, activateTab, title } = this.props;
    const isActive = activeTab === index;
    const height = isActive ? 'auto' : 0;
    return (
      <div className={this.props.className} aria-expanded={isActive}>
        <button className="accordion-item-label quests-item-label" onClick={activateTab}>
          {title}
        </button>
        <AnimateHeight duration={500} height={height}>
          {this.props.children}
        </AnimateHeight>
      </div>
    );
  }
}
