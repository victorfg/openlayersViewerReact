import { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import App from "./App";
import Login from "./pages/login/Login/Login";
import DashBoard from './pages/dashboard/Dashboard/Dashboard'

function RouterMiddleware() {
    const [loginResult, setLoginResult]= useState({
        statusOk: null,
        messageError: null
    });
    return (
        <div className="App">
        <Router>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/login" exact component={()=><Login loginResult={loginResult} setLoginResult={setLoginResult}/>} />
                <Route path="/dashboard" exact component={DashBoard} />
            </Switch>
        </Router>
        </div>
    );
}

export default RouterMiddleware;