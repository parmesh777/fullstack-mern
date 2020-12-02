import React, { Component } from "react";
import axios from "axios";
import "../App.css";
//import UserList from "./UsersList";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
// import { Modal, ModalHeader, ModalBody, ModalFooter } from "bootstrap";

class EditUser extends Component {
  state = {
    firstName: "",
    lastName: "",
    age: 0,
    gender: "",
    show: false,

    users: [],
    persons: [],
  };
  // getUsers() {
  //   axios
  //     .get("/api/users")
  //     .then((res) => {
  //       this.setState({ users: res.data });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  // componentDidMount() {
  //   this.getUsers();
  // }
  componentDidMount() {
    axios
      .get("/api/users")
      .then((res) => {
        this.setState({ persons: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("/api/users/edit/" + this.props.match.params.id)
      .then((res) => {
        this.setState({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          age: res.data.age,
          gender: res.data.gender,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
    axios.get("/api/users").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          users: response.data.map((user) => user.firstName),
        });
      }
    });
  }
  onChange = (e) => {
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

    axios
      .put("/api/users/edit/" + this.props.match.params.id, userData, config)
      .then((res) => console.log(res.data));
    window.location = "/";
    console.log(this.state);
    this.setState({
      firstName: "",
      lastName: "",
      age: 0,
      gender: "",
    });
  };
  deleteUser = (id) => {
    axios.delete("/api/users/" + id).then((res) => console.log(res.data));

    this.setState({
      persons: this.state.persons.filter((el) => el._id !== id),
    });
  };

  render() {
    return (
      <div className="container">
        <div className="container" style={{ textAlign: "center" }}>
          <h2>Edit User Details</h2>
          <button className="btn btn-primary">Add Details</button>
        </div>

        <br />
        <br />
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
          </div>

          <div className="form-group">
            <input type="submit" value="EditUser" className="btn btn-primary" />
          </div>
        </form>

        <table className="table table-striped">
          <thead className="tableHover">
            <tr>
              <th>Sr no.</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {this.state.persons.map((currentUser, index) => {
              return (
                <tr key={currentUser._id}>
                  <td>{index + 1}</td>
                  <td>{currentUser.firstName}</td>
                  <td>{currentUser.lastName}</td>
                  <td>{currentUser.age}</td>
                  <td>{currentUser.gender}</td>
                  <td>
                    <Link
                      to={"/edit/" + currentUser._id}
                      className="btn btn-info"
                    >
                      Edit
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => this.deleteUser(currentUser._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default EditUser;
