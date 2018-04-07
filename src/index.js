import React from 'react'
import ReactDOM from 'react-dom'
import RegisterPage from './components/App.js'
import AdminApp from './admin_components/AdminApp.js';
import App from './components/App.js';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

ReactDOM.render((
    <Router>
        <Switch>
            <Route exact path='/' component={App} />
            <Route path='/admin' component={AdminApp} />
            <Redirect to='/' />
        </Switch>
    </Router>
), document.getElementById("app"))