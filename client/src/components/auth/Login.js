import React, { Component } from "react";
import { Link } from "react-router-dom";
import Input from "../general/Input";

class Login extends Component {
  constructor(){
    super()
    this.state = {
      email:"",
      password:"",
    }
  }
  render() {
    return (
      <div className="container">
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user"></i>Create Your Account
        </p>
        <div className="form">
          <Input
            type="email"
            placeholder="Enter Email"
            value="email"
            onChange={this.onChange}
          />
        </div>
        <div className="form">
          <Input
            type="password"
            placeholder="Enter Password"
            value="password"
            onChange={this.onChange}
          />
        </div>
        <button className="btn btn-primary">Sign In</button>
        <p className="my-1">
          Dont Have an account?<Link to="/register"> Sign Up</Link>
        </p>
      </div>
    );
  }
}

export default Login;
