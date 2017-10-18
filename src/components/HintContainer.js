import React from 'react'
import Spinner from './Spinner.js'
import GetHintLink from './GetHintLink.js'
import Timer from './Timer.js'
import Hint from './Hint.js'
import { fetchHint } from '../api/api.js'


class HintContainer extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = this.getInitialState()
    }

    getInitialState() {
        const initialState = {
            isHintRequested: false,
            timeout: 3,
            hint: null
        }
        return initialState
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.questionNumber > this.props.questionNumber) {
            this.resetState()
        }
    }

    resetState() {
        this.setState(this.getInitialState())
    }

    showHint() {
        this.setState({ isHintRequested: true });
        let interval = setInterval(
            () => this.setState(prevState => {
                if (prevState.timeout <= 1) {
                    clearInterval(interval);
                    fetchHint().then(body => {
                        this.setState({ hint: body.hint });
                        this.props.updateHintRetrievals(body.hintRetrievals);
                    });
                } return { timeout: prevState.timeout - 1 }
            })
            , 1000)
    }

    render() {
        const shouldLoad = this.state.isHintRequested && !this.state.timeout <= 0;
        return (
            <div id='hint-container'>
                {!this.state.isHintRequested && <GetHintLink click={this.showHint.bind(this)} />}
                {shouldLoad && <Spinner />}
                {shouldLoad && <Timer timer={this.state.timeout} />}
                <Hint hintText={this.state.hint} />
            </div>
        )
    }
}

export default HintContainer;