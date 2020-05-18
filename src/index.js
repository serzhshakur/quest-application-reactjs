import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.js'
import AdminApp from './admin_components/AdminApp.js';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'

ReactDOM.render((
    <Router>
        <Switch>
            <Route exact path='/' component={App}/>
            <Route path='/admin' component={AdminApp}/>
            <Redirect to='/'/>
        </Switch>
    </Router>
), document.getElementById("app"))