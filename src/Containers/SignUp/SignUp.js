import React, { Component } from "react";
import { validateFields } from "../../Components/Validation/Validation";
import "./SignUp.css";
import axios from "axios";

class SignUp extends Component {
  state = {
    formDetails: {
      firstname: {
        value: "",
        blur: false,
        error: "",
      },
      lastname: {
        value: "",
        blur: false,
        error: "",
      },
      username: {
        value: "",
        blur: false,
        error: "",
      },
      // date: {
      //     value: '',
      //     blur: false,
      //     error: ''
      // },
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
      confirmpassword: {
        value: "",
        blur: false,
        error: "",
        actualVal: "",
      },
    },
    submitCalled: false,
    allFieldsValidated: false,
  };

  errorHandler(validationFunc, inputIdentifier) {
    let errorMsg = validationFunc(
      this.state.formDetails[inputIdentifier].value
    );
    // console.log(errorMsg);
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
    if (inputIdentifier === "password") {
      updatedForm["confirmpassword"].actualVal = event.target.value;
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
    error.push(this.errorHandler(validateFields.validateName, "firstname"));
    error.push(this.errorHandler(validateFields.validateName, "lastname"));
    error.push(this.errorHandler(validateFields.validateEmail, "email"));
    error.push(this.errorHandler(validateFields.validatePassword, "password"));
    if (
      this.state.formDetails["confirmpassword"].value !==
      this.state.formDetails["confirmpassword"].actualVal
    ) {
      error.push("Password doesnot match");
      // console.log(this.state.formDetails["confirmpassword"]);
    } else {
      error.push("");
    }

    const updatedForm = {
      ...this.state.formDetails,
    };

    for (let formElement in updatedForm) {
      if (formElement !== "date") {
        updatedForm[formElement].error = error[i];
        if (error[i] !== "" && shouldValidate) {
          shouldValidate = false;
        }
        // console.log(formElement);
        i++;
      }
    }
    this.setState({
      formDetails: updatedForm,
      allFieldsValidated: shouldValidate,
      submitCalled: true,
    });
  };

  postForm = () => {
    var data = {
      first_name: this.state.formDetails.firstname.value,
      last_name: this.state.formDetails.lastname.value,
      gender: this.state.formDetails.username.value,
      dob: this.state.formDetails.username.value,
      email: this.state.formDetails.email.value,
      password: this.state.formDetails.password.value,
    };
    console.log(data);
    axios.post("http://127.0.0.1:8000/api/signup", data).then(
      (response) => {
        console.log(response.data);
      },
      (error) => {
        console.log(error.response.request.response);
      }
    );
  };

  componentDidUpdate() {
    if (this.state.submitCalled) {
      if (this.state.allFieldsValidated) {
        this.setState({ submitCalled: false });
        console.log("Form submitted");
      }
    }
  }

  render() {
    // console.log(this.state.formDetails);
    return (
      <main>
        <div>
          <h2>LOCOMO</h2>
        </div>
        <div className="p">
          <p className="register">Register</p>
        </div>
        <form onSubmit={this.submitHandler}>
          {/* First Name and Last Name */}
          <div className="name signupInput">
            <label> First Name </label>
            <input
              type="name"
              name="firstname"
              className={
                this.state.formDetails["firstname"].error
                  ? "errorInput"
                  : "correctInput"
              }
              onBlur={(event) =>
                this.blurHandler(validateFields.validateName, event)
              }
              onChange={(event) =>
                this.changeHandler(validateFields.validateName, event)
              }
            />
            <div className="error">
              {this.state.formDetails["firstname"].error}
            </div>
          </div>

          <div className="name signupInput">
            <label> Last Name </label>
            <input
              type="name"
              name="lastname"
              className={
                this.state.formDetails["lastname"].error
                  ? "errorInput"
                  : "correctInput"
              }
              onBlur={(event) =>
                this.blurHandler(validateFields.validateName, event)
              }
              onChange={(event) =>
                this.changeHandler(validateFields.validateName, event)
              }
            />
            <div className="error">
              {this.state.formDetails["lastname"].error}
            </div>
          </div>

          <div className="name signupInput">
            <label> User Name </label>
            <input
              type="name"
              name="username"
              className={
                this.state.formDetails["username"].error
                  ? "errorInput"
                  : "correctInput"
              }
              onBlur={(event) =>
                this.blurHandler(validateFields.validateName, event)
              }
              onChange={(event) =>
                this.changeHandler(validateFields.validateName, event)
              }
            />
            <div className="error">
              {this.state.formDetails["username"].error}
            </div>
          </div>

          {/* <div className="other signupInput">
                        <label>Gender</label>
                        <select name="gender" >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Others</option>
                        </select>
                    </div> */}

          {/* <div className="other signupInput">
                        <label>DOB</label>
                        <input type="date" name="dob" placeholder="DOB" />

                    </div> */}

          <div className="email signupInput">
            <label>
              Email
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
            </label>
            <div className="error">{this.state.formDetails["email"].error}</div>
          </div>

          <div className="password signupInput">
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
          <div className="password signupInput">
            <label>
              Confirm Password
              <input
                type="password"
                name="confirmpassword"
                className={
                  this.state.formDetails["confirmpassword"].error
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
              {this.state.formDetails["confirmpassword"].error}
            </div>
          </div>

          <div className="submit">
            <button onClick={this.postForm}>REGISTER</button>
          </div>
        </form>
      </main>
    );
  }
}
export default SignUp;
