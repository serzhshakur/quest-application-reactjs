import React, {FC, useCallback, useEffect, useState} from "react"
import RegisterPage from "./RegisterPage"
import QuestPage from "./QuestPage"
import WelcomePage from "./WelcomePage"
import FinalPage from "./FinalPage"
import {fetchSession, SessionResponse} from "../api/clientApi"
import StickyHeader from "./StickyHeader"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import {Redirect} from "react-router";

const App: FC = () => {

    const [isRegistered, setIsRegistered] = useState(false)
    const [hasPendingSession, setHasPendingSession] = useState(false)

    const sessionFetcher = useCallback(async () => {
        const response = await fetchSession()
        if (response.status === 200) {
            const {finished}: SessionResponse = await response.json()
            if (!finished) {
                setHasPendingSession(true)
            }
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
                    <Route exact path="/">
                        {(isRegistered || hasPendingSession)
                            ? <Redirect to="/welcome"/>
                            : <RegisterPage onRegisterFunc={onRegister}/>
                        }
                    </Route>
                    <Route exact path="/welcome">
                        <WelcomePage hasPendingSession={hasPendingSession}
                                     redirectPath="/quest"/>
                    </Route>
                    <Route path="/quest" component={QuestPage}/>
                    <Route path="/finish" component={FinalPage}/>
                </Switch>
            </Router>
        </div>
    )
}

export default App
