import React, {FC, useCallback, useEffect, useState} from "react"
import RegisterPage from "./RegisterPage"
import QuestPage from "./QuestPage"
import WelcomePage from "./WelcomePage"
import FinalPage from "./FinalPage"
import PrivateRoute from "./PrivateRoute"
import {fetchSession, SessionResponse} from "../api/clientApi"
import StickyHeader from "./StickyHeader"
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom"

const App: FC = () => {

    const [isRegistered, setIsRegistered] = useState(false)
    const [hasPendingSession, setHasPendingSession] = useState(false)

    const sessionFetcher = useCallback(async () => {
        const response = await fetchSession()
        if (response.status === 200) {
            const {finished}: SessionResponse = await response.json()
            !finished && setHasPendingSession(true)
        }
    }, [])

    useEffect(() => {
        sessionFetcher()
    }, [])

    function onRegister() {
        setIsRegistered(true)
    }

    return (
        <div>
            <StickyHeader hasPendingSession={hasPendingSession}/>
            <Router>
                <Switch>
                    <Route path="/quest" component={QuestPage}/>
                    <Route path="/finish" component={FinalPage}/>
                    {hasPendingSession && (<Redirect to="/quest"/>)}
                    < PrivateRoute exact path="/"
                                   isTrue={isRegistered}
                                   redirectPath="/register"
                                   component={() => (<WelcomePage redirectPath="/quest"/>)}/>
                    <Route path="/register"
                           render={() => (
                               <RegisterPage
                                   onRegister={onRegister}
                                   redirectPath="/"/>
                           )}/>
                </Switch>
            </Router>
        </div>
    )
}

export default App
