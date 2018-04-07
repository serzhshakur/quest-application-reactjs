import React from 'react'
import ReactDOM from 'react-dom'
import Main from './Main.js'
import CreateQuest from './CreateQuest.js'
import { Switch, Route } from 'react-router-dom'
import EditQuest from './EditQuest.js';

class AdminApp extends React.PureComponent {

    render() {
        return (
            <Switch>
                <Route exact path='/admin' component={Main} />
                <Route exact path='/admin/create-quest' component={CreateQuest} />)} />
                <Route path='/admin/edit-quest/:questId' component={EditQuest} />)} />
            </Switch>
        )
    }
}

export default AdminApp