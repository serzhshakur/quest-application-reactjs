import React from 'react'
import ReactDOM from 'react-dom'
import RegisterPage from './RegisterPage.js'
import WelcomePage from './WelcomePage.js'
import Quest from './Quest.js'
import FinalPage from './FinalPage.js'
import PrivateRoute from './PrivateRoute.js'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


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
                    <Switch>
                        <PrivateRoute exact path='/' isRegistered={this.state.isRegistered} component={WelcomePage} />
                        <Route path='/register' render={props => (<RegisterPage onRegister={this.onRegister.bind(this)} />)} />
                        <Route path='/quest' component={Quest} />
                        <Route path='/finish' component={FinalPage} />
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App