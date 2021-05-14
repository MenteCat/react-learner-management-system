import React, { Component } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import './index.css';

import AddLearner from "./components/AddLearner";
import LearnersList from "./components/ListLearner";
import Register from "./components/Register"
import Login from "./components/Login"

import firebase from './firebase';

const logOutUser = () => {
  localStorage.removeItem('logged');
  firebase.auth().signOut();
  window.location.href = '/';
 };

class ProtectedRoute extends Component {
  render() {
    const { component: Component, ...props } = this.props

    return (
      <Route 
        {...props} 
        render={props => (
          localStorage.getItem('logged') === 'true' ?
            <Component {...props} /> :
            <Redirect to='/login' />
        )} 
      />
    )
  }
}

class App extends Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">

          <a href="/learners" className="navbar-brand">
            LMS
          </a>

          <ul className="nav nav-pills justify-content-end">
            <li className="nav-item">
              <Link to={"/learners"} className="nav-link" style={{color: "white"}}>
                Learners
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link active">
                Add
              </Link>
            </li>
            {
              localStorage.getItem('logged') === 'true' ? (
              <li className="nav-item">
              <button className="btn" onClick={logOutUser} style={{color: "white"}}>
                Logout
              </button>
            </li>
              ) : (
            <li className="nav-item">
              <Link to={"/signup"} className="nav-link" style={{color: "white"}}>
                Sign Up
              </Link>
            </li>
              )
            }
            
          </ul>

        </nav>
  
        <div className="container mt-3">
          
          <h2>Learners Management System</h2>
          <Switch>
            <ProtectedRoute exact path={["/", "/learners"]} component={LearnersList} />
            <ProtectedRoute exact path="/add" component={AddLearner} />
            <Route exact path="/signup" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>

      </div>
    );
  }
}

export default App;