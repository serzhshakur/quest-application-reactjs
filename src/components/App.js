import React from 'react'
import RegisterPage from './RegisterPage.js'
import WelcomePage from './WelcomePage.js'
import QuestPage from './QuestPage.js'
import TeamNamePage from './TeamNamePage.js'
import FinalPage from './FinalPage.js'
import PrivateRoute from './PrivateRoute.js'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'


class App extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            isRegistered: false,
            isNameGiven: false
        }
    }

    onRegister() {
        this.setState({isRegistered: true})
    }

    render() {
        return (
            <div>
                <h1 id='sticky-title'>Квест</h1>
                <Router>
                    <Switch>
                        <PrivateRoute exact path='/'
                                      isTrue={this.state.isRegistered}
                                      redirectPath='/register'
                                      component={WelcomePage}/>
                        <Route path='/register' render={() => (
                            <RegisterPage
                                onRegister={this.onRegister.bind(this)}
                                redirectPath='/team-name'
                            />
                        )}/>
                        <Route path='/team-name' render={() => (
                            <TeamNamePage redirectPath='/quest'/>
                        )}/>
                        <Route path='/quest' component={QuestPage}/>
                        <Route path='/finish' component={FinalPage}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App