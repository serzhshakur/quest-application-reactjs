import React from 'react'
import { PureComponent } from 'react'

export default class extends PureComponent {
    constructor(props) {
        super(props)
    }

    replaceUnnecessaryAttributes(targetElement) {
        // workaround for bug when Chrome adds extra 'style' attributes to some elements
        while (targetElement.querySelectorAll('[style*="color"]').length > 0) {
            targetElement.querySelector('[style*="color"]').removeAttribute('style');
        }
        // replacing 'script' tags if there're any
        while (targetElement.getElementsByTagName('script').length > 0) {
            let el = targetElement.querySelector('script');
            el.parentNode.removeChild(el);
        }
    }

    onBlur(e) {
        let targetElement = e.target;
        this.replaceUnnecessaryAttributes(targetElement);
        const text = targetElement.innerHTML;
        this.props.propagateContent(text);
    }

    render() {
        return (
            <div className='quest-prop'>
                <div className='prop-title'>{this.props.title}</div>
                <div
                    contentEditable={this.props.isEditMode} suppressContentEditableWarning='disabled'
                    onBlur={this.onBlur.bind(this)}
                    className={`prop-content${this.props.content === this.props.unsavedContent ? '' : ' unsaved'}`}
                    dangerouslySetInnerHTML={{ __html: this.props.unsavedContent }}
                >
                </div>
            </div>
        )
    }
}
