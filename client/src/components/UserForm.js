import React, { Component } from "react";
import axios from "axios";
import "../App.css";

export default class CreateUser extends Component {
  state = {
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    fName: "",
    lName: "",
    aError: "",
    gError: "",
    fnError: "",
    visible: true,
    users: [],
    search: "",
  };

  componentDidMount() {
    axios.get("/api/users").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          users: response.data.map((user) => user.firstName),
        });
      }
    });
  }

  // validate = () => {
  //   let error = "";

  //   if (!this.state.firstName || !this.state.lastName || !this.state.age) {
  //     error = "can't be Blank";
  //   }
  //   if (error) {
  //     this.setState({ error });
  //     return false;
  //   }
  //   return true;
  // };

  validate = () => {
    let fName = "";
    let lName = "";
    let aError = "";
    let gError = "";

    if (!this.state.firstName) {
      fName = "can't be blank";
    }
    if (!this.state.lastName) {
      lName = "can't be blank";
    }
    if (!this.state.age) {
      aError = "can't be blank";
    }
    if (!this.state.gender) {
      gError = "can't be blank";
    }
    if (fName || lName || aError || gError) {
      this.setState({ fName, lName, aError, gError });
      return false;
    }
    return true;
  };
  onChange = (e) => {
    if (e.target.name === "firstName") {
      if (!this.state.firstName.length > 0) {
        this.setState({ fName: "" });
      }
    }
    if (e.target.name === "lastName") {
      if (!this.state.lastName.length > 0) {
        this.setState({ lName: "" });
      }
    }
    if (e.target.name === "age") {
      if (!this.state.age.length > 0) {
        this.setState({ aError: "" });
      }
    }
    if (e.target.name === "gender") {
      if (!this.state.gender.length > 0) {
        this.setState({ gError: "" });
      }
    }

    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const userData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
      gender: this.state.gender,
    };

    const isValid = this.validate();
    if (isValid) {
      axios
        .post("/api/users", userData, config)
        .then((res) => console.log(res.data));
      window.location = "/";

      this.setState({
        firstName: "",
        lastName: "",
        age: 0,
        gender: "",
        fName: "",
        lName: "",
        aError: "",
        gError: "",
      });
    }
  };

  render() {
    return (
      <div className="container">
        <div className="container" style={{ textAlign: "center" }}>
          <h1>User Entry Details</h1>
          <button
            className="btn btn-primary"
            onClick={() => {
              this.setState({
                visible: !this.state.visible,
              });
            }}
          >
            Add Details
          </button>
        </div>
        <br />
        <br />

        {this.state.visible ? null : (
          <form onSubmit={this.handleSubmit} className="contain">
            <div className="form-group">
              <label>Firstname: </label>
              <br />
              <input
                type="text"
                placeholder="Enter firstname"
                name="firstName"
                className="form-group"
                value={this.state.firstName}
                onChange={this.onChange}
              />
              <div style={{ fontSize: 14, color: "red" }}>
                {this.state.fName}
              </div>
            </div>

            <div className="form-group">
              <label>Lastname: </label>
              <br />
              <input
                type="text"
                placeholder="Enter lastname"
                name="lastName"
                className="form-group"
                value={this.state.lastName}
                onChange={this.onChange}
              />
              <div style={{ fontSize: 14, color: "red" }}>
                {this.state.lName}
              </div>
            </div>

            <div className="form-group">
              <label>Age: </label>
              <br />
              <input
                type="number"
                name="age"
                className="form-group"
                value={this.state.age}
                onChange={this.onChange}
              />
              <div style={{ fontSize: 14, color: "red" }}>
                {this.state.aError}
              </div>
            </div>

            <div className="form-group">
              <label>
                Gender:
                <br />
                <input
                  type="radio"
                  value="male"
                  name="gender"
                  checked={this.state.gender === "male"}
                  onChange={this.onChange}
                />
                Male
                <br />
                <input
                  type="radio"
                  value="female"
                  name="gender"
                  checked={this.state.gender === "female"}
                  onChange={this.onChange}
                />
                Female
              </label>
              <div style={{ fontSize: 14, color: "red" }}>
                {this.state.gError}
              </div>
            </div>

            <div className="form-group ">
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary  "
                style={{
                  minWidth: "200%",
                }}
              />
            </div>
          </form>
        )}
      </div>
    );
  }
}
