import React from "react";

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isActionRequested: false,
            shouldDoAction: false
        }
    }

    requestAction() {
        this.setState({isActionRequested: true});
    }

    cancelAction() {
        this.setState({isActionRequested: false});
    }

    render() {
        return (
            <div className='action-button-container'>
                <div className={
                    `action-button-descr ${this.state.isActionRequested
                        ? 'action-button-descr-visible'
                        : 'action-button-descr-hidden'}`}
                >
                    {this.props.title}?
                </div>
                {!this.state.isActionRequested
                    ? <button
                        className={`${this.props.className}`}
                        onClick={this.requestAction.bind(this)}
                    >
                        {this.props.children}
                    </button>
                    : <div className="actions-confirmation-container">
                        <button className={`action-button-safe ${this.props.className}`}
                                onClick={this.cancelAction.bind(this)}>Нет
                        </button>
                        <button className={`action-button-danger ${this.props.className}`}
                                onClick={this.props.action.bind(this)}>Да
                        </button>
                    </div>
                }
            </div>
        );
    }
}
