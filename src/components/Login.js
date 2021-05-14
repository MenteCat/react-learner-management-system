import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from '../firebase';

class Login extends Component {
 constructor(props) {
  super(props);
  this.handleInputChange = this.handleInputChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.state = {
    email: '',
    password: '',
    error: null,
  };
}

handleInputChange = (e) => {
   this.setState({ [e.target.name]: e.target.value });
 };

handleSubmit = (e) => {
   e.preventDefault();
   const { email, password } = this.state;
  firebase
     .auth()
     .signInWithEmailAndPassword(email, password)
     .then((user) => {
       localStorage.setItem('logged', true);
       this.props.history.push({pathname: '/'});
     })
     .catch((error) => {
       this.setState({ error: error });
     });
 };

 render() {
   const { email, password, error } = this.state;
   return (
     <div>
       { error ? (
          <div>
            {error.message}
          </div> ) : (
          <div className="edit-form">
            <form onSubmit={this.handleSubmit}>
             <div className="form-group">
             <input
              type="text"
              name="email"
              placeholder="Email"
              className="form-control"
              value={email} 
              onChange={this.handleInputChange}
              />
              </div>
              <div className="form-group">
             <input
               type="password"
               name="password"
               placeholder="Password"
               className="form-control"
               value={password}
               onChange={this.handleInputChange}
             />
             </div>
             <button className="btn btn-primary" children="Log In" />
           </form>
          </div>
       )
      }
     </div>
   )
 }
}

export default withRouter(Login);