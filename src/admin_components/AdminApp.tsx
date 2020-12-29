import React from "react";
import {Route, Switch} from "react-router-dom";
import Main from "./Main";
import CreateQuest from "./CreateQuest";
import EditQuest from "./EditQuest";
import AdminLogin from "./AdminLogin";
import QuestStatistics from "./QuestStatistics";

class AdminApp extends React.PureComponent {
    render() {
        return (
            <Switch>
                <Route exact path="/admin/" component={Main}/>
                <Route exact path="/admin/login" component={AdminLogin}/>
                <Route exact path="/admin/create-quest" component={CreateQuest}/>
                <Route path="/admin/edit-quest/:questId" component={EditQuest}/>
                <Route path="/admin/quest-statistics/:questId" component={QuestStatistics}/>
            </Switch>
        )
    }
}

export default AdminApp
