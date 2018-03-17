import React from 'react'
import { fetchFinalWords } from '../api/api.js'

class FinalPage extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            finalWordsText: ''
        }
    }

    componentDidMount() {
        fetchFinalWords().then(text => this.setState({ finalWordsText: text }))
    }

    render() {
        return (<div className="regular-page">
            <div>{this.state.finalWordsText}</div>
        </div>
        )
    }
}

export default FinalPage