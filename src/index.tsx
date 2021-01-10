import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import AdminApp from "./admin_components/AdminApp";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import DummyPage from "./components/DummyPage";

ReactDOM.render((
    <Router>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/quest/:questId" component={DummyPage}/>
            <Route path="/admin" component={AdminApp}/>
            <Redirect to="/"/>
        </Switch>
    </Router>
), document.getElementById("app"))
