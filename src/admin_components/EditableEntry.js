import React from 'react'
import { PureComponent } from 'react'

export default class extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            content: this.props.content
        }
    }

    onBlur(e) {
        const text = e.target.innerText;
        this.props.propagateContent(text);
        this.setState({ content: text });
    }

    render() {
        return (
            <div className='quest-prop'>
                <div className='prop-title'>{this.props.title}</div>
                <div
                    contentEditable={this.props.isEditMode} suppressContentEditableWarning='disabled'
                    onBlur={this.onBlur.bind(this)}
                    className={`prop-content${this.state.content == this.props.content ? '' : ' unsaved'}`}
                >
                    {this.state.content}
                </div>
            </div>
        )
    }
}