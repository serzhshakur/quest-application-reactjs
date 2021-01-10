import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import AdminApp from "./admin_components/AdminApp";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import WelcomePage from "./components/WelcomePage";

ReactDOM.render((
    <Router>
        <Switch>
            <Route exact path="/quest/:questId"> <WelcomePage/> </Route>
            <Route path="/admin"> <AdminApp/> </Route>
            <Route path="/"> <App/> </Route>
        </Switch>
    </Router>
), document.getElementById("app"))
