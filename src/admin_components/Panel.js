import ReactDOM from "react-dom";
import React from "react";

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 0
    };
  }

  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    const height = el.querySelector(".panel__inner").scrollHeight;
    this.setState({
      height
    });
  }

  render() {
    const { title, activeTab, index, activateTab, isEditMode, markItemForRemoval, isForRemoval } = this.props;
    const { height } = this.state;
    const isActive = activeTab === index;
    const innerStyle = {
      height: isActive ? `${height}px` : "0px"
    };

    return (
      <div
        className={`panel ${isForRemoval ? 'item-to-remove' : ''}`}
        role="tabpanel"
        aria-expanded={isActive}
      >
        <div className='panel-label-container'>
          <button
            className='panel-remove-button'
            onClick={markItemForRemoval}
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
        <div className="panel__inner" style={innerStyle}>
          <div className="panel__content">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
