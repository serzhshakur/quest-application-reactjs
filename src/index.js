import React from 'react'
import ReactDOM from 'react-dom'
import RegisterPage from './components/RegisterPage.js'
import WelcomePage from './components/WelcomePage.js'
import Quest from './components/Quest.js'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const App = () => (
    <div>
        <h1 id='sticky-title'>Квест</h1>
        <Router>
            <div>
                <Route exact path='/' component={RegisterPage} />
                <Route path='/welcome' component={WelcomePage} />
                <Route path='/quest' component={Quest} />
            </div>
        </Router>
    </div>
)

ReactDOM.render(<App />, document.getElementById("app"))