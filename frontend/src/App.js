import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Admin from "./components/Admin";
import User from "./components/User";
import UsersInformation from "./components/UsersInformation";
import EmailConmirmation from "./components/EmailConfirmation";
import SpecificUserInfoPage from "./components/SpecificUserInfoPage";
import UsersPosts from "./components/UsersPosts";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route
            path="/emailConfirmation"
            exact
            component={EmailConmirmation}
          />
          <Route path="/user" exact component={User} />
          <Route path="/admin" exact component={Admin} />
          <Route path="/admin/users" exact component={UsersInformation} />
          <Route
            path="/admin/users/:slag"
            exact
            component={SpecificUserInfoPage}
          />
          <Route path="/usersPosts" exact component={UsersPosts} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
