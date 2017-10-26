import React from 'react'
import ReactDOM from 'react-dom'
import RegisterPage from './components/RegisterPage.js'
import WelcomePage from './components/WelcomePage.js'
import Quest from './components/Quest.js'
import FinalPage from './components/FinalPage.js'
import PrivateRoute from './components/PrivateRoute.js'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            isRegistered: false
        }
    }

    onRegister() {
        this.setState({ isRegistered: true })
    }

    render() {
        return (
            <div>
                <h1 id='sticky-title'>Квест</h1>
                <Router>
                    <div>
                        <PrivateRoute exact path='/' isRegistered={this.state.isRegistered} component={WelcomePage} />
                        <Route path='/register' render={props => (<RegisterPage onRegister={this.onRegister.bind(this)} />)} />
                        <Route path='/quest' component={Quest} />
                        <Route path='/finish' component={FinalPage} />
                    </div>
                </Router>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("app"))