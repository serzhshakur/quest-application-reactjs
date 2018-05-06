import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route } from 'react-router-dom'
import Main from './Main.js'
import CreateQuest from './CreateQuest.js'
import EditQuest from './EditQuest.js';
import AdminLogin from './AdminLogin.js';
import { fetchQuests } from '../api/api';

class AdminApp extends React.PureComponent {
    render() {
        return (
            <Switch>
                <Route exact path='/admin/' component={Main} />)} />
                <Route exact path='/admin/login' component={AdminLogin} />)} />
                <Route exact path='/admin/create-quest' component={CreateQuest} />)} />
                <Route path='/admin/edit-quest/:questId' component={EditQuest} />)} />
            </Switch>
        )
    }
}

export default AdminApp