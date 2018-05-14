import ReactDOM from "react-dom";
import React from "react";
import AnimateHeight from 'react-animate-height';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 0
    };
  }

  render() {
    const { title, activeTab, index, activateTab, isEditMode, removeItem, isNewItem } = this.props;
    const isActive = activeTab === index;
    const height = isActive ? 'auto' : 0;

    return (
      <div
        className={`panel ${isNewItem ? 'new-array-item' : ''}`}
        role="tabpanel"
        aria-expanded={isActive}
      >
        <div className='panel-label-container'>
          <button
            className='panel-remove-button'
            onClick={removeItem}
            disabled={!isEditMode}
          >
            {isEditMode ? '⨯' : ''}
          </button>
          <button
            className="panel__label"
            role="tab"
            onClick={activateTab}
          >
            {title}
          </button>
        </div>
        <AnimateHeight duration={500} height={height} >
          <div className="panel__inner" >
            <div className="panel__content">
              {this.props.children}
            </div>
          </div>
        </AnimateHeight>
      </div>
    );
  }
}
