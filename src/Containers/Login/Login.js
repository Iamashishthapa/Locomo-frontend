import React, { Component } from "react";
import { validateFields } from "../../Components/Validation/Validation";
import "./Login.css";
import { NavLink } from "react-router-dom";
import axios from "axios";

class Login extends Component {
  state = {
    formDetails: {
      email: {
        value: "",
        blur: false,
        error: "",
      },
      password: {
        value: "",
        blur: false,
        error: "",
      },
    },
    submitCalled: false,
    allFieldsValidated: false,
  };

  errorHandler(validationFunc, inputIdentifier) {
    let errorMsg = validationFunc(
      this.state.formDetails[inputIdentifier].value
    );
    return errorMsg;
  }

  changeHandler = (validationFunc, event) => {
    const inputIdentifier = event.target.name;

    const updatedForm = {
      ...this.state.formDetails,
    };
    const updateValue = {
      ...updatedForm[inputIdentifier],
    };

    let errorMsg = validationFunc(event.target.value);

    updateValue.value = event.target.value;

    // Will only be activated after first blur in input.
    if (this.state.formDetails[inputIdentifier].blur) {
      if (errorMsg) {
        updateValue.error = errorMsg;
      } else {
        updateValue.error = "";
      }
    }
    updatedForm[inputIdentifier] = updateValue;

    this.setState({ formDetails: updatedForm });
  };

  // Runs only once.
  blurHandler = (validationFunc, event) => {
    if (!this.state.formDetails[event.target.name].blur) {
      const inputIdentifier = event.target.name;

      const updatedForm = {
        ...this.state.formDetails,
      };
      const updateValue = {
        ...updatedForm[inputIdentifier],
      };

      const errorMsg = validationFunc(event.target.value);
      updateValue.error = errorMsg;
      updateValue.blur = true;

      updatedForm[inputIdentifier] = updateValue;

      this.setState({ formDetails: updatedForm });
    }
  };

  submitHandler = (e) => {
    e.preventDefault();
    const error = [];
    let i = 0,
      shouldValidate = true;
    error.push(this.errorHandler(validateFields.validateEmail, "email"));
    error.push(this.errorHandler(validateFields.validatePassword, "password"));

    const updatedForm = {
      ...this.state.formDetails,
    };

    for (let formElement in updatedForm) {
      updatedForm[formElement].error = error[i];
      if (error[i] !== "" && shouldValidate) {
        shouldValidate = false;
      }
      i++;
    }
    this.setState({
      formDetails: updatedForm,
      allFieldsValidated: shouldValidate,
      submitCalled: true,
    });
  };

  loginClicked = () => {
    var data = {
      email: this.state.formDetails.email.value,
      password: this.state.formDetails.password.value,
    };
    console.log(data);
    axios.post("http://127.0.0.1:8000/api/login", data).then(
      (response) => {
        console.log(response.request.response);
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  };

  componentDidUpdate() {
    if (this.state.submitCalled) {
      if (this.state.allFieldsValidated) {
        this.setState({ submitCalled: false });
      }
    }
  }

  render() {
    return (
      <div className="LoginPage">
        <p className="locomoTitle">Locomo</p>

        <div className="LoginBody">
          <p>Login</p>
          <form onSubmit={(e) => this.submitHandler(e)}>
            <div className="wrapper">
              <label> Email </label>
              <input
                type="email"
                name="email"
                className={
                  this.state.formDetails["email"].error
                    ? "errorInput"
                    : "correctInput"
                }
                onBlur={(event) =>
                  this.blurHandler(validateFields.validateEmail, event)
                }
                onChange={(event) =>
                  this.changeHandler(validateFields.validateEmail, event)
                }
              />
              <div className="error">
                {this.state.formDetails["email"].error}
              </div>
            </div>

            <div className="wrapper">
              <label>
                Password
                <input
                  type="password"
                  name="password"
                  className={
                    this.state.formDetails["password"].error
                      ? "errorInput"
                      : "correctInput"
                  }
                  onBlur={(event) =>
                    this.blurHandler(validateFields.validatePassword, event)
                  }
                  onChange={(event) =>
                    this.changeHandler(validateFields.validatePassword, event)
                  }
                />
              </label>
              <div className="error">
                {this.state.formDetails["password"].error}
              </div>
            </div>

            <div className="btnLogin">
              <button className="btn-login" onClick={this.loginClicked}>
                Login
              </button>
            </div>
          </form>
        </div>

        <div className="tosignup">
          <NavLink exact to="/signup">
            New to Locomo? Create Account.
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Login;
