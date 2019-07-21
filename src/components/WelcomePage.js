import React from 'react'
import {Link} from 'react-router-dom'
import {fetchIntro} from '../api/api.js'

class WelcomePage extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            introText: ''
        }
    }

    componentDidMount() {
        fetchIntro().then(text => this.setState({introText: text}))
    }

    render() {
        return (
            <div className='regular-page'>
                <div id='introductory-paragraph' dangerouslySetInnerHTML={{__html: this.state.introText}}/>
                <div>
                    <Link to='/quest'>
                        <button className="regular-button">Вперед</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default WelcomePage