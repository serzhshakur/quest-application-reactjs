import React, {FC} from "react"
import RegisterPage from "./RegisterPage"
import QuestPage from "./QuestPage"
import WelcomePage from "./WelcomePage"
import FinalPage from "./FinalPage"
import {BrowserRouter as Router, Route} from "react-router-dom"
import {Redirect, Switch} from "react-router";

const App: FC = () => {

    return <Router>
        <Switch>
            <Route exact path="/quest/:questId"> <WelcomePage/> </Route>
            <Route path="/quest">
                <QuestPage/>
            </Route>
            <Route path="/welcome">
                <WelcomePage/>
            </Route>
            <Route exact path="/register">
                <RegisterPage/>
            </Route>
            <Route path="/finish">
                <FinalPage/>
            </Route>
            <Route path="/">
                <Redirect to='/welcome'/>
            </Route>
        </Switch>
    </Router>
}

export default App
