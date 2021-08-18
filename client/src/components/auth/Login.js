import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { message } from "antd";
import Input from "../general/Input";
import { login } from "../../actions/authActions";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps && nextProps.errors && nextProps.errors.length > 0) {
      nextProps.errors.forEach(error => {
        // console.log(error.msg)
        message.error(error.msg);
      });
    }

    if (nextProps.isAuthenticated) {
      message.success(`Welcome!!`);
      setTimeout(() => this.props.history.push("/"), 2000);
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit() {
    const { email, password } = this.state;
    const user = {
      email,
      password,
    };
    // console.log("login",user)
    this.props.login(user);
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="container">
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user"></i>Create Your Account
        </p>
        <div className="form">
          <Input
            name="email"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={this.onChange}
          />
        </div>
        <div className="form">
          <Input
            name="password"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={this.onChange}
          />
        </div>
        <button className="btn btn-primary" onClick={this.onSubmit}>
          Sign In
        </button>
        <p className="my-1">
          Dont Have an account?<Link to="/register"> Sign Up</Link>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.auth.errors,
});

export default connect(mapStateToProps, { login })(withRouter(Login));
