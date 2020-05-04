import React from 'react'
import RegisterPage from './RegisterPage.js'
import QuestPage from './QuestPage.js'
import WelcomePage from './WelcomePage.js'
import FinalPage from './FinalPage.js'
import PrivateRoute from './PrivateRoute.js'
import {fetchSession} from '../api/api'
import StickyHeader from './StickyHeader'
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'


class App extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            isRegistered: false,
            hasPendingSession: false,
            isNameGiven: false
        }
    }

    componentDidMount() {
        fetchSession().then(response => {
                if (response.status === 200) {
                    response.json().then(r =>
                        !r.finished && this.setState({
                            hasPendingSession: true
                        })
                    )
                }
            }
        )
    }

    onRegister() {
        this.setState({isRegistered: true})
    }

    render() {
        return (
            <div>
                <StickyHeader hasPendingSession={this.state.hasPendingSession}/>
                <Router>
                    <Switch>
                        <Route path='/quest' component={QuestPage}/>
                        <Route path='/finish' component={FinalPage}/>
                        {this.state.hasPendingSession && (<Redirect to='/quest'/>)}
                        < PrivateRoute exact path='/'
                                       isTrue={this.state.isRegistered}
                                       redirectPath='/register'
                                       component={() => (<WelcomePage redirectPath='/quest'/>)}/>
                        <Route path='/register'
                               render={() => (
                                   <RegisterPage
                                       onRegister={this.onRegister.bind(this)}
                                       redirectPath='/'/>
                               )}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App