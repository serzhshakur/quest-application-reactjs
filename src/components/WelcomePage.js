import React from 'react'
import { Link } from 'react-router-dom'
import { fetchIntro } from '../api/api.js'

class WelcomePage extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            introText: ''
        }
    }

    componentDidMount() {
        fetchIntro().then(text => this.setState({ introText: text }))
    }

    render() {
        return (<div id='introductory-section' className="regular-page">
            <p>{this.state.introText}</p>
            <div>
                <button className="regular-button">
                    <Link to='/quest'>Вперед</Link>
                </button>
            </div>
        </div>
        )
    }
}

export default WelcomePage