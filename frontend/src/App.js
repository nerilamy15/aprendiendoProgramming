import React from 'react';
import {BrowserRouter as Router, Switch,Route} from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Admin from "./components/Admin";
import User from "./components/User";


function App() {
  return (
    <Router>
      <div className="App">
      <Navbar/>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/register" exact component={Register}/>
        <Route path="/user" exact component={User}/>
        <Route path="/admin" exact component={Admin}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
