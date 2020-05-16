import React from 'react'
import icon from '../assets/exit.png'
import {deleteSession} from '../api/api'
import {Redirect} from 'react-router-dom'

class StickyHeader extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            shouldRedirect: false
        }
    }

    exit() {
        deleteSession().then(() => this.setState(
            {shouldRedirect: true})
        )
    }

    render() {
        const {hasPendingSession} = this.props;
        return this.state.shouldRedirect ? (<Redirect to='/register'/>) : (
            <div id='sticky-title'>
                <div className="one-third">
                    {/*    /!*free space*!/*/}
                </div>
                <div className="one-third">
                    <h1>Квест</h1>
                </div>
                <div className="one-third">
                    {
                        hasPendingSession && (
                            <button onClick={this.exit.bind(this)}>
                                <img src={icon} alt="Exit"/>
                            </button>)
                    }
                </div>
            </div>
        )
    }
}

export default StickyHeader